import { Migration } from '@mikro-orm/migrations';

export class Migration20240110194247 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "organizations" ("id" serial primary key, "name" varchar(255) not null, "address" varchar(255) not null, "logo" varchar(255) not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('create table "users" ("id" serial primary key, "first_name" varchar(255) not null, "last_name" varchar(255) not null, "email" varchar(100) not null, "password" varchar(100) not null, "role" text check ("role" in (\'superAdmin\', \'manager\', \'employee\')) not null default \'employee\', "organization_id" int null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');
    this.addSql('alter table "users" add constraint "users_email_unique" unique ("email");');

    this.addSql('create table "posts" ("id" varchar(255) not null, "user_id" int not null, "body" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, constraint "posts_pkey" primary key ("id"));');

    this.addSql('create table "leaves" ("id" serial primary key, "user_id" int not null, "approved_by" int not null, "date" timestamptz(0) not null, "type" varchar(255) not null, "reason" varchar(255) null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null);');

    this.addSql('alter table "users" add constraint "users_organization_id_foreign" foreign key ("organization_id") references "organizations" ("id") on update cascade on delete set null;');

    this.addSql('alter table "posts" add constraint "posts_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');

    this.addSql('alter table "leaves" add constraint "leaves_user_id_foreign" foreign key ("user_id") references "users" ("id") on update cascade;');
  }

}
