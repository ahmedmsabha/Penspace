import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from './guards/google-auth/google-auth.guard';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth/jwt-auth.guard';
import { GithubAuthGuard } from './guards/github-auth/github-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @UseGuards(GoogleAuthGuard)
  @Get('google/login')
  googleLogin() {}

  @UseGuards(GoogleAuthGuard)
  @Get('google/callback')
  async googleCallback(@Request() req, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const userData = await this.authService.login(req.user);

    res.redirect(
      `http://localhost:3000/api/auth/google/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }

  @UseGuards(JwtAuthGuard)
  @Get('verify-token')
  verify() {
    return 'ok';
  }

  @UseGuards(GithubAuthGuard)
  @Get('github/login')
  githubLogin() {}

  @UseGuards(GithubAuthGuard)
  @Get('github/callback')
  async githubCallback(@Request() req, @Res() res: Response) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    const userData = await this.authService.login(req.user);
    res.redirect(
      `http://localhost:3000/api/auth/github/callback?userId=${userData.id}&name=${userData.name}&avatar=${userData.avatar}&accessToken=${userData.accessToken}`,
    );
  }
}
