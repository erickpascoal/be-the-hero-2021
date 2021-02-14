import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTableIncidents1613240005576 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`
            CREATE TABLE incident (
                id serial,
                title VARCHAR(255) NOT NULL,
                description VARCHAR(255) NOT NULL,
                value double precision NOT NULL,
                ong_id int4,

                CONSTRAINT pk_incident PRIMARY KEY(id),
                CONSTRAINT fk_incident_ong FOREIGN KEY (ong_id)
                 REFERENCES ong(id) ON DELETE CASCADE
            );
        `)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        return queryRunner.query(`DROP TABLE incident;`);
    }

}
