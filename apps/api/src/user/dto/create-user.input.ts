import { InputType, Field } from '@nestjs/graphql';
import { IsEmail } from 'class-validator';
@InputType()
export class CreateUserInput {
  @Field(() => String)
  name: string;

  @Field()
  password: string;

  @Field(() => String)
  @IsEmail()
  email: string;

  @Field(() => String, { nullable: true })
  bio?: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
