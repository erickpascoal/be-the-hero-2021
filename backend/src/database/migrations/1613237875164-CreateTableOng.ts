import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableOng1613237875164 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TABLE ong (
                id serial,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                password TEXT NOT NULL,
                whatsapp VARCHAR(255) NOT NULL,
                city VARCHAR(255) NOT NULL,
                uf VARCHAR(2) NOT NULL,

                CONSTRAINT pk_ong PRIMARY KEY(id)
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`DROP TABLE ong;`);
    }

}
