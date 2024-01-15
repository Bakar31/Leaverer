import { Controller, Post as HttpPost, Body, Get, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { User } from 'src/users/users.entity';
import { Post } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  async posts(@Query() user: User): Promise<Post[]> {
    return this.postsService.getPostsForUser(user);
  }

  @HttpPost()
  async createPost(
    @Body() { user, body }: { user: User; body: string },
  ): Promise<Post> {
    return this.postsService.createPost(user, body);
  }
}
