import { MigrationInterface, QueryRunner } from "typeorm";

export class FakeHouses1609520382802 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
        insert into house (title, description, userId) values ('012 Fuller Plaza', 'Nullam porttitor lacus at turpis. Donec posuere metus vitae ipsum. Aliquam non mauris. Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 1);
        `)
    }

    public async down(_: QueryRunner): Promise<void> {
    }

}
