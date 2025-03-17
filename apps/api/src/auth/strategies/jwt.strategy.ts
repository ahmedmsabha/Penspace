import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import {
  ExtractJwt,
  Strategy,
  type StrategyOptionsWithoutRequest,
} from 'passport-jwt';
import { AuthJwtPayload } from '../types/auth-jwt_payload';
import { AuthService } from '../auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(
    configService: ConfigService,
    private readonly authService: AuthService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
    } as StrategyOptionsWithoutRequest);
  }

  async validate(payload: AuthJwtPayload) {
    const userId = payload.sub;
    return await this.authService.validateJwtUser(userId);
  }
}
