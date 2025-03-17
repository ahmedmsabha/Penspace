/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Query, Resolver, Args, Int, Mutation, Context } from '@nestjs/graphql';
import { CommentService } from './comment.service';
import { CommentEntity } from './entities/comment.entity';
import { DEFAULT_PAGE_SIZE } from '../constants';
import { CreateCommentInput } from './dto/create-comment.input';
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth/jwt-auth.guard';

@Resolver(() => CommentEntity)
export class CommentResolver {
  constructor(private readonly commentService: CommentService) {}

  @Query(() => [CommentEntity])
  getPostComments(
    @Args('postId', { type: () => Int }) postId: number,
    @Args('take', { type: () => Int, defaultValue: DEFAULT_PAGE_SIZE })
    take?: number,
    @Args('skip', { type: () => Int, defaultValue: 0 }) skip?: number,
  ) {
    return this.commentService.findOneByPost({ postId, take, skip });
  }

  @Query(() => Int)
  getPostCommentsCount(@Args('postId', { type: () => Int }) postId: number) {
    return this.commentService.count({ postId });
  }

  @UseGuards(JwtAuthGuard)
  @Mutation(() => CommentEntity)
  createComment(
    @Context() Context,
    @Args('createCommentInput') createCommentInput: CreateCommentInput,
  ) {
    const authorId: number = Context.req.user.id;
    return this.commentService.create(createCommentInput, authorId);
  }
}
