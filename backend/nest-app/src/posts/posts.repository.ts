// import { MikroORM } from '@mikro-orm/core';
// import { Post } from './posts.entity';
// import { User } from '../users/users.entity';
// import { NotFoundException } from '@nestjs/common';

// export class PostRepository {
//   constructor(private readonly orm: MikroORM) {}

//   async createPost(user: User, body: string): Promise<Post> {
//     const post = this.postRepository.create({
//       user,
//       body,
//       createdAt: new Date(),
//       updatedAt: new Date(),
//     });
//     await this.postRepository.persist(post);
//     return post;
//   }
// }
