import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { AuthPayload as Auth } from './entities/auth.entity';
import { SignInInput } from './dto/sign-in-input';

@Resolver(() => Auth)
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => Auth)
  async signIn(@Args('signInInput') signInInput: SignInInput) {
    const user = await this.authService.validateLocalUser(signInInput);

    return await this.authService.login(user);
  }
}
