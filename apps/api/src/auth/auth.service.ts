import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignInInput } from './dto/sign-in-input';
import { PrismaService } from 'src/prisma/prisma.service';
import { verify } from 'argon2';
import { JwtService } from '@nestjs/jwt';
import { AuthJwtPayload } from './types/auth-jwt_payload';
import type { User } from '@prisma/client';
import type { CreateUserInput } from 'src/user/dto/create-user.input';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}
  async validateLocalUser({ email, password }: SignInInput) {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const isPasswordValid = await verify(user.password, password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return user;
  }

  async generateToken(userId: number) {
    const payload: AuthJwtPayload = { sub: userId };
    const accessToken = await this.jwtService.signAsync(payload);
    return { accessToken };
  }

  async login(user: User) {
    const { accessToken } = await this.generateToken(user.id);
    return {
      accessToken,
      id: user.id,
      name: user.name,
      avatar: user.avatar,
    };
  }

  async validateJwtUser(userId: number) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new UnauthorizedException('User not found');

    const currentUser = { id: userId };

    return currentUser;
  }

  async validateGoogleUser(userData: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }

    const dbUser = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    const { password, ...authUser } = dbUser;

    return authUser;
  }

  async validateGithubUser(userData: CreateUserInput) {
    const user = await this.prisma.user.findUnique({
      where: { email: userData.email },
    });

    if (user) {
      const { password, ...authUser } = user;
      return authUser;
    }

    const dbUser = await this.prisma.user.create({
      data: {
        ...userData,
      },
    });

    const { password, ...authUser } = dbUser;

    return authUser;
  }
}
