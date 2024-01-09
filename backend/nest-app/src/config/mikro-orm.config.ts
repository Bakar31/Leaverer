/* eslint-disable prettier/prettier */
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from '../users/users.entity';
import { Organization } from '../organizations/organizations.entity';
import { Leave } from '../leaves/leaves.entity';
import { Post } from '../posts/posts.entity';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  dbName: process.env.DBNAME,
  entities: [User, Organization, Leave, Post],
  entitiesTs: [User, Organization, Leave, Post],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
});
