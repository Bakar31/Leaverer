import { Controller, Post as HttpPost, Body } from '@nestjs/common';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { PostsService } from './posts.service';
import { User } from 'src/users/users.entity';
import { Post } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @HttpPost()
  async createPost(
    @CurrentUser() user: User,
    @Body() body: string,
  ): Promise<Post> {
    return this.postsService.createPost(user, body);
  }
}
