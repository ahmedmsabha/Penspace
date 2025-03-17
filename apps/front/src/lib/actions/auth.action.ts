"use server";

import type { SignUpFormState, SignInFormState } from "@/lib/types/form-state";
import { SignUpFormSchema } from "../schemas/sign-up.schema";
import { SignInFormSchema } from "../schemas/sign-in.schema";
import { fetchGraphQL } from "../fetch-graphql";
import { CREATE_USER_MUTATION, SIGN_IN_MUTATION } from "../gql-queries";
import { print } from "graphql";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createSession } from "../session";

// Define GraphQL error interface
interface GraphQLError {
  message: string;
  path?: string[];
  extensions?: Record<string, unknown>;
}

// Define general error types
type ApiError = Error & {
  code?: string;
  details?: string;
  statusCode?: number;
};

export async function signUp(
  state: SignUpFormState,
  formData: FormData
): Promise<SignUpFormState | null> {
  // Extract form data outside of try/catch
  const formEntries = Object.fromEntries(formData.entries());

  // Validate fields
  const validatedFields = SignUpFormSchema.safeParse(formEntries);
  if (!validatedFields.success) {
    return {
      data: formEntries,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const registrationResult = await processRegistration(formEntries);

  if (registrationResult.success) {
    redirect("/");
  }

  return registrationResult.formState;
}

async function processRegistration(
  formEntries: Record<string, FormDataEntryValue>
): Promise<{
  success: boolean;
  formState?: SignUpFormState;
}> {
  try {
    const data = await fetchGraphQL(print(CREATE_USER_MUTATION), {
      input: {
        ...formEntries,
      },
    });

    if (data.errors) {
      const errorMessages = data.errors
        .map((err: GraphQLError) => err.message || "")
        .join(" ");

      if (
        errorMessages.toLowerCase().includes("email") &&
        errorMessages.toLowerCase().includes("already exists")
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            errors: {
              email: [
                "This email is already registered. Please use another email or sign in with your existing account.",
              ],
            },
          },
        };
      }

      if (
        errorMessages.toLowerCase().includes("password") &&
        errorMessages.toLowerCase().includes("requirements")
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            errors: {
              password: [
                "Your password doesn't meet security requirements. Please use at least 8 characters including letters, numbers, and special characters.",
              ],
            },
          },
        };
      }

      if (
        errorMessages.toLowerCase().includes("username") &&
        (errorMessages.toLowerCase().includes("already exists") ||
          errorMessages.toLowerCase().includes("taken"))
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            errors: {
              name: [
                "This username is already taken. Please choose another username.",
              ],
            },
          },
        };
      }

      // Default error for other registration issues
      return {
        success: false,
        formState: {
          data: formEntries,
          message: "Registration failed: " + errorMessages,
        },
      };
    }

    // Registration successful
    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);

    // Type guard for ApiError
    const apiError = error as ApiError;

    // Check if error is related to duplicate email
    if (
      apiError.message &&
      apiError.message.toLowerCase().includes("email") &&
      (apiError.message.toLowerCase().includes("already exists") ||
        apiError.message.toLowerCase().includes("duplicate") ||
        apiError.message.toLowerCase().includes("unique"))
    ) {
      return {
        success: false,
        formState: {
          data: formEntries,
          errors: {
            email: [
              "This email address is already registered. Please use a different email or sign in with your existing account.",
            ],
          },
        },
      };
    }

    if (
      apiError.code === "NETWORK_ERROR" ||
      apiError.message.includes("network")
    ) {
      return {
        success: false,
        formState: {
          data: formEntries,
          message:
            "Unable to connect to the server. Please check your internet connection and try again.",
        },
      };
    }

    if (apiError.statusCode === 429 || apiError.message.includes("too many")) {
      return {
        success: false,
        formState: {
          data: formEntries,
          message: "Too many registration attempts. Please try again later.",
        },
      };
    }

    return {
      success: false,
      formState: {
        data: formEntries,
        message:
          "Registration failed: " +
          (apiError.details || apiError.message || "Please try again later."),
      },
    };
  }
}

export async function signIn(
  state: SignInFormState,
  formData: FormData
): Promise<SignInFormState | null> {
  // Extract form data outside of try/catch
  const formEntries = Object.fromEntries(formData.entries());

  // Validate fields
  const validatedFields = SignInFormSchema.safeParse(formEntries);
  if (!validatedFields.success) {
    return {
      data: formEntries,
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  // Authenticate the user
  const authResult = await authenticateUser(formEntries);

  if (authResult.success) {
    revalidatePath("/");
    redirect("/");
  }

  return authResult.formState;
}

async function authenticateUser(
  formEntries: Record<string, FormDataEntryValue>
): Promise<{
  success: boolean;
  formState?: SignInFormState;
}> {
  try {
    // Create a filtered version of formEntries without the remember-me field
    const { "remember-me": rememberMe, ...filteredInput } = formEntries;

    // Store if user wants to be remembered (longer session)
    const shouldRemember = rememberMe === "on";

    // GraphQL query with filtered input
    const data = await fetchGraphQL(print(SIGN_IN_MUTATION), {
      input: filteredInput,
    });

    if (data.errors) {
      const errorMessages = data.errors
        .map((err: GraphQLError) => err.message || "")
        .join(" ");

      if (errorMessages.toLowerCase().includes("user not found")) {
        return {
          success: false,
          formState: {
            data: formEntries,
            errors: {
              email: [
                "No account found with this email address. Please check your email or create an account.",
              ],
            },
          },
        };
      }

      if (
        errorMessages.toLowerCase().includes("incorrect password") ||
        errorMessages.toLowerCase().includes("invalid password")
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            errors: {
              password: [
                "Incorrect password. Please try again or reset your password.",
              ],
            },
          },
        };
      }

      if (
        errorMessages.toLowerCase().includes("account") &&
        errorMessages.toLowerCase().includes("locked")
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            message:
              "Your account has been temporarily locked due to multiple failed login attempts. Please try again later or reset your password.",
          },
        };
      }

      if (
        errorMessages.toLowerCase().includes("verification") ||
        errorMessages.toLowerCase().includes("verify")
      ) {
        return {
          success: false,
          formState: {
            data: formEntries,
            message:
              "Please verify your email address before signing in. Check your inbox for a verification email.",
          },
        };
      }

      // Default error for other sign-in issues
      return {
        success: false,
        formState: {
          data: formEntries,
          message: "Sign-in failed: " + errorMessages,
        },
      };
    }

    if (!data || !data.signIn) {
      return {
        success: false,
        formState: {
          data: formEntries,
          message:
            "Authentication failed: No user data returned from server. Please try again.",
        },
      };
    }

    // Create session
    try {
      const sessionCreated = await createSession(
        {
          user: {
            id: data.signIn.id || "",
            name: data.signIn.name || "",
            avatar: data.signIn.avatar || "",
          },
          accessToken: data.signIn.accessToken || "",
        },
        shouldRemember
      );

      if (!sessionCreated) {
        return {
          success: false,
          formState: {
            data: formEntries,
            message:
              "Failed to create your session. Please try signing in again.",
          },
        };
      }

      // Authentication and session creation succeeded
      return { success: true };
    } catch (sessionError) {
      console.error("Session creation error:", sessionError);
      return {
        success: false,
        formState: {
          data: formEntries,
          message:
            "Failed to set up your session. Please try signing in again.",
        },
      };
    }
  } catch (error) {
    console.error("Authentication error:", error);

    // Try to extract detailed error information
    const apiError = error as ApiError;

    if (
      apiError.message?.toLowerCase().includes("network") ||
      apiError.code === "NETWORK_ERROR"
    ) {
      return {
        success: false,
        formState: {
          data: formEntries,
          message:
            "Unable to connect to the authentication service. Please check your internet connection and try again.",
        },
      };
    }

    if (apiError.statusCode === 429) {
      return {
        success: false,
        formState: {
          data: formEntries,
          message:
            "Too many sign-in attempts. Please wait a moment before trying again.",
        },
      };
    }

    return {
      success: false,
      formState: {
        data: formEntries,
        message:
          "Authentication failed: " +
          (apiError.details || apiError.message || "Please try again."),
      },
    };
  }
}
