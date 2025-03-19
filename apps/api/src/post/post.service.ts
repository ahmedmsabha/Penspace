import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DEFAULT_PAGE_SIZE } from '../constants';
import type { UpdatePostInput } from './dto/update-post.input';
import type { CreatePostInput } from './dto/create-post.input';
@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll({
    skip = 0,
    take = DEFAULT_PAGE_SIZE,
  }: {
    skip?: number;
    take?: number;
  }) {
    return await this.prisma.post.findMany({
      skip,
      take,
    });
  }

  async findCount() {
    return await this.prisma.post.count();
  }

  async findOne(id: number) {
    return await this.prisma.post.findFirst({
      where: { id },
      include: {
        author: true,
        tags: true,
      },
    });
  }

  async getUserPosts(userId: number, skip: number, take: number) {
    return await this.prisma.post.findMany({
      where: { author: { id: userId } },
      select: {
        id: true,
        title: true,
        content: true,
        createdAt: true,
        published: true,
        slug: true,
        thumbnail: true,
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
      take,
      skip,
    });
  }

  async getUserPostsCount(userId: number) {
    return this.prisma.post.count({
      where: {
        authorId: userId,
      },
    });
  }

  async create({
    createPostInput,
    authorId,
  }: {
    createPostInput: CreatePostInput;
    authorId: number;
  }) {
    return await this.prisma.post.create({
      data: {
        ...createPostInput,
        author: {
          connect: {
            id: authorId,
          },
        },
        tags: {
          connectOrCreate: createPostInput.tags.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async update({
    userId,
    updatePostInput,
  }: {
    userId: number;
    updatePostInput: UpdatePostInput;
  }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: updatePostInput.postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();
    const { postId, ...data } = updatePostInput;
    return await this.prisma.post.update({
      where: {
        id: postId,
      },
      data: {
        ...data,
        tags: {
          set: [],
          connectOrCreate: data.tags?.map((tag) => ({
            where: { name: tag },
            create: { name: tag },
          })),
        },
      },
    });
  }

  async delete({ postId, userId }: { postId: number; userId: number }) {
    const authorIdMatched = await this.prisma.post.findUnique({
      where: { id: postId, authorId: userId },
    });

    if (!authorIdMatched) throw new UnauthorizedException();

    // First delete all related comments to avoid foreign key constraint violations
    await this.prisma.comment.deleteMany({
      where: { postId },
    });

    // Now it's safe to delete the post
    const result = await this.prisma.post.delete({
      where: {
        id: postId,
        authorId: userId,
      },
    });

    return !!result;
  }
}
