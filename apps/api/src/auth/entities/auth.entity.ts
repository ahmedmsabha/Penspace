import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field(() => String)
  accessToken: string;

  @Field(() => Number)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  avatar?: string;
}
