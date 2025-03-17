import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, StrategyOptionsWithRequest } from 'passport-github2';
import { AuthService } from '../auth.service';
import { Profile } from 'passport-github2';

@Injectable()
export class GithubStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      clientID: configService.get<string>('GITHUB_CLIENT_ID'),
      clientSecret: configService.get<string>('GITHUB_CLIENT_SECRET'),
      callbackURL: configService.get<string>('GITHUB_CALLBACK_URL'),
      scope: ['user:email', 'read:user'],
    } as StrategyOptionsWithRequest);
  }
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any) => void,
  ) {
    const user = await this.authService.validateGithubUser({
      email: profile?.emails?.[0]?.value || '',
      name: profile?.displayName || '',
      avatar: profile?.photos?.[0]?.value || '',
      password: '',
    });

    done(null, user);
  }
}
