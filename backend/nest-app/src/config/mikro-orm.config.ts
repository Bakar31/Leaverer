/* eslint-disable prettier/prettier */
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import * as dotenv from 'dotenv';
dotenv.config();

export default defineConfig({
  host: process.env.HOST,
  port: Number(process.env.PORT),
  user: process.env.USER,
  password: process.env.PASSWORD,
  dbName: process.env.DBNAME,
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
});
