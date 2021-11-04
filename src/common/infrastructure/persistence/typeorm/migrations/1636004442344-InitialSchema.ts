import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636004442344 implements MigrationInterface {
    name = 'InitialSchema1636004442344'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contractors\` (\`user_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(25) NOT NULL, \`age\` int UNSIGNED NOT NULL, \`rate\` float UNSIGNED NOT NULL, \`number_of_rates\` int UNSIGNED NOT NULL, UNIQUE INDEX \`UQ_contractors_user_id\` (\`user_id\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`user_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(25) NOT NULL, \`age\` int UNSIGNED NOT NULL, \`rate\` float UNSIGNED NOT NULL, \`number_of_rates\` int UNSIGNED NOT NULL, \`years_of_experience\` int UNSIGNED NOT NULL, \`availability\` varchar(25) NOT NULL, UNIQUE INDEX \`UQ_employees_user_id\` (\`user_id\`), PRIMARY KEY (\`user_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_employees_user_id\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP INDEX \`UQ_contractors_user_id\` ON \`contractors\``);
        await queryRunner.query(`DROP TABLE \`contractors\``);
    }

}
