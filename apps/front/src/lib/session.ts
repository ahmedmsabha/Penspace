import { jwtVerify, SignJWT } from "jose";
import { cookies } from "next/headers";

export type SessionUser = {
  id?: string;
  name?: string;
  avatar?: string;
};

export type Session = {
  user: SessionUser;
  accessToken: string;
};

const secretKey = process.env.SESSION_SECRET_KEY!;
if (!process.env.SESSION_SECRET_KEY) {
  console.warn(
    "WARNING: SESSION_SECRET_KEY is not defined. Using fallback secret key for development only."
  );
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(
  payload: Session,
  rememberMe: boolean = false
) {
  try {
    const expirationTime = rememberMe ? "30d" : "7d";
    const expirationMs = rememberMe
      ? 30 * 24 * 60 * 60 * 1000
      : 7 * 24 * 60 * 60 * 1000;

    const session = await new SignJWT(payload)
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime(expirationTime)
      .sign(encodedKey);

    const expiredAt = new Date(Date.now() + expirationMs);

    const cookieStore = await cookies();
    cookieStore.set("pen-space-session", session, {
      httpOnly: true,
      secure: true,
      expires: expiredAt,
      sameSite: "lax",
      path: "/",
    });

    return true;
  } catch (error) {
    console.error("Failed to create session:", error);
    return false;
  }
}

export async function getSession() {
  try {
    const cookieStore = await cookies();
    const cookie = cookieStore.get("pen-space-session")?.value;
    if (!cookie) return null;

    const { payload } = await jwtVerify(cookie, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as Session;
  } catch (err) {
    console.error("Failed to verify the session: ", err);
    return null;
  }
}

export async function deleteSession() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete("pen-space-session");
    return true;
  } catch (error) {
    console.error("Failed to delete session:", error);
    return false;
  }
}
