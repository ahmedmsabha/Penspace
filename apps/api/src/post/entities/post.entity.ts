import { ObjectType, Field, Int } from '@nestjs/graphql';
import { User } from 'src/user/entities/user.entity';
import { CommentEntity } from 'src/comment/entities/comment.entity';
import { Like } from 'src/like/entities/like.entity';
import { Tag } from 'src/tag/entities/tag.entity';

@ObjectType()
export class Count {
  @Field(() => Int)
  likes: number;

  @Field(() => Int)
  comments: number;
}

@ObjectType()
export class Post {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field()
  content: string;

  @Field({ nullable: true })
  slug?: string;

  @Field({ nullable: true })
  thumbnail?: string;

  @Field(() => Boolean)
  published: boolean;

  @Field(() => User)
  author: User;

  @Field(() => [CommentEntity], { nullable: true })
  comments?: CommentEntity[];

  @Field(() => Count)
  _count: Count;

  @Field(() => [Like], { nullable: true })
  likes?: Like[];

  @Field(() => [Tag], { nullable: true })
  tags?: Tag[];

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
