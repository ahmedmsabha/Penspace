import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Post } from 'src/post/entities/post.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
@ObjectType()
export class User {
  @Field(() => Int)
  id: number;

  @Field()
  name: string;

  @Field()
  email: string;


  @Field({ nullable: true })
  avatar?: string;

  @Field({ nullable: true })
  bio?: string;

  @Field(() => [Post], { nullable: true })
  posts?: Post[];

  @Field(() => [CommentEntity], { nullable: true })
  comments?: CommentEntity[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
