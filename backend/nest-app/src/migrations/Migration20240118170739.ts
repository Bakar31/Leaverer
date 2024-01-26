import { Migration } from '@mikro-orm/migrations';

export class Migration20240118170739 extends Migration {

  async up(): Promise<void> {
    this.addSql('alter table "leaves" drop constraint if exists "leaves_type_check";');

    this.addSql('alter table "leaves" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "leaves" add constraint "leaves_type_check" check ("type" in (\'PTO\', \'SickLeave\'));');
  }

  async down(): Promise<void> {
    this.addSql('alter table "leaves" drop constraint if exists "leaves_type_check";');

    this.addSql('alter table "leaves" alter column "type" type text using ("type"::text);');
    this.addSql('alter table "leaves" add constraint "leaves_type_check" check ("type" in (\'pto\', \'sick_leave\'));');
  }

}
