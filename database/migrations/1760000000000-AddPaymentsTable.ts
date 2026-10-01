import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddPaymentsTable1760000000000 implements MigrationInterface {
  name = 'AddPaymentsTable1760000000000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "payments" (
        "id" SERIAL NOT NULL,
        "order_id" integer NOT NULL,
        "payment_method" character varying(50) NOT NULL,
        "transaction_id" character varying(150),
        "amount" numeric NOT NULL,
        "status" character varying(30),
        "paid_at" TIMESTAMP,
        CONSTRAINT "PK_payments_id" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "payments"`);
  }
}
