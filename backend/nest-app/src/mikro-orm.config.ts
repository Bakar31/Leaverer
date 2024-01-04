/* eslint-disable prettier/prettier */
import { defineConfig } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

export default defineConfig({
  host: 'localhost',
  port: 5432,
  user: 'postgres',
  password: '1808031',
  dbName: 'nest',
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  debug: true,
  metadataProvider: TsMorphMetadataProvider,
  // @ts-expect-error nestjs adapter option
  registerRequestContext: false,
});




// import { MikroORM } from '@mikro-orm/core';
// import { PostgreSqlDriver } from '@mikro-orm/postgresql';

// export default {
//   dbName: 'nest',
//   user: 'postgres',
//   password: '1808031',
//   type: 'postgresql',
//   driver: PostgreSqlDriver,
//   entitiesDirs: ['dist/entities'],
//   entitiesDirsTs: ['src/entities'],
//   migrations: {
//     tableName: 'mikro_orm_migrations',
//     path: './migrations',
//     pattern: /^[\w-]+\d+\.[tj]s$/,
//   },
//   debug: process.env.NODE_ENV !== 'production',
// } as Parameters<typeof MikroORM.init>[0];
