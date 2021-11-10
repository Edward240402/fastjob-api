import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636579281306 implements MigrationInterface {
    name = 'InitialSchema1636579281306'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`contracts\` (\`id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`employee_id\` bigint UNSIGNED NOT NULL, \`contractor_id\` bigint UNSIGNED NOT NULL, \`contract_date\` datetime NOT NULL, \`agreed_date\` datetime NULL, \`job\` varchar(50) NOT NULL, \`state\` varchar(50) NOT NULL, UNIQUE INDEX \`UQ_contracts_id\` (\`id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`contractors\` (\`contractor_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(25) NOT NULL, \`age\` int UNSIGNED NOT NULL, \`rate\` float UNSIGNED NOT NULL, \`number_of_rates\` int UNSIGNED NOT NULL, UNIQUE INDEX \`UQ_contractors_contractor_id\` (\`contractor_id\`), PRIMARY KEY (\`contractor_id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`employees\` (\`employee_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT, \`name\` varchar(50) NOT NULL, \`email\` varchar(50) NOT NULL, \`password\` varchar(25) NOT NULL, \`age\` int UNSIGNED NOT NULL, \`rate\` float UNSIGNED NOT NULL, \`number_of_rates\` int UNSIGNED NOT NULL, \`years_of_experience\` int UNSIGNED NOT NULL, \`availability\` varchar(25) NOT NULL, UNIQUE INDEX \`UQ_employees_employee_id\` (\`employee_id\`), PRIMARY KEY (\`employee_id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_employees_employee_id\` ON \`employees\``);
        await queryRunner.query(`DROP TABLE \`employees\``);
        await queryRunner.query(`DROP INDEX \`UQ_contractors_contractor_id\` ON \`contractors\``);
        await queryRunner.query(`DROP TABLE \`contractors\``);
        await queryRunner.query(`DROP INDEX \`UQ_contracts_id\` ON \`contracts\``);
        await queryRunner.query(`DROP TABLE \`contracts\``);
    }

}
