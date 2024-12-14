import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@mikro-orm/nestjs';
import { EntityManager, EntityRepository } from '@mikro-orm/core';
import { Post } from './posts.entity';
import { User } from 'src/users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: EntityRepository<Post>,
    private readonly em: EntityManager,
  ) {}

  async createPost(user: User, body: string): Promise<Post> {
    const post = new Post();
    post.user = user;
    post.body = body;

    await this.postRepository.persistAndFlush(post);
    return post;
  }

  async getPostsForUser(user: User): Promise<Post[]> {
    const organizationId = user.organization;

    if (!organizationId) {
      return [];
    }

    try {
      return this.postRepository.find(
        {
          user: {
            organization: organizationId,
          },
        },
        { populate: ['user'] },
      );
    } catch (error) {
      console.error('Error fetching posts:', error);
      return [];
    }
  }
}
