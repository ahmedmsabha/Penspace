import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { Post } from 'src/post/entities/post.entity';

@ObjectType()
export class CommentEntity {
  @Field(() => Int)
  id: number;

  @Field()
  content: string;

  @Field(() => User)
  author: User;

  @Field(() => Post)
  post: Post;

  @Field()
  createdAt: Date;
}
