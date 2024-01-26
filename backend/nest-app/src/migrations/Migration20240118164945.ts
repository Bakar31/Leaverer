import { Migration } from '@mikro-orm/migrations';

export class Migration20240118164945 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "posts" alter column "id" drop default;');
    this.addSql('alter table "posts" alter column "id" type uuid using ("id"::text::uuid);');

    this.addSql('alter table "leaves" add column "status" text check ("status" in (\'pending\', \'approved\', \'rejected\')) not null default \'pending\';');
    this.addSql('alter table "leaves" alter column "id" drop default;');
    this.addSql('alter table "leaves" alter column "id" type uuid using ("id"::text::uuid);');
    this.addSql('alter table "leaves" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "leaves" add constraint "leaves_type_check" check ("type" in (\'pto\', \'sick_leave\'));');
    this.addSql('alter table "leaves" alter column "id" drop default;');
  }

  async down(): Promise<void> {
    this.addSql('alter table "posts" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "leaves" drop constraint if exists "leaves_type_check";');
    this.addSql('alter table "leaves" alter column "id" type text using ("id"::text);');

    this.addSql('alter table "posts" alter column "id" type varchar(255) using ("id"::varchar(255));');

    this.addSql('alter table "leaves" alter column "id" type int using ("id"::int);');
    this.addSql('alter table "leaves" alter column "type" type varchar(255) using ("type"::varchar(255));');
    this.addSql('alter table "leaves" drop column "status";');
    this.addSql('create sequence if not exists "leaves_id_seq";');
    this.addSql('select setval(\'leaves_id_seq\', (select max("id") from "leaves"));');
    this.addSql('alter table "leaves" alter column "id" set default nextval(\'leaves_id_seq\');');
  }

}
