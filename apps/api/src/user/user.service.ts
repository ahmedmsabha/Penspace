import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'argon2';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}
  async createUser(createUserInput: CreateUserInput) {
    const { password, ...userData } = createUserInput;
    const hashedPassword = await hash(password);
    return await this.prisma.user.create({
      data: { ...userData, password: hashedPassword },
    });
  }
}
