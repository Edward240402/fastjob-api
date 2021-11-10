import {MigrationInterface, QueryRunner} from "typeorm";

export class InitialSchema1636518379901 implements MigrationInterface {
    name = 'InitialSchema1636518379901'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_contractors_user_id\` ON \`contractors\``);
        await queryRunner.query(`DROP INDEX \`UQ_employees_user_id\` ON \`employees\``);
        await queryRunner.query(`ALTER TABLE \`contractors\` CHANGE \`user_id\` \`contractor_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`user_id\` \`employee_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`contractors\` ADD UNIQUE INDEX \`IDX_a5a70dc7116719427753733112\` (\`contractor_id\`)`);
        await queryRunner.query(`ALTER TABLE \`employees\` ADD UNIQUE INDEX \`IDX_c9a09b8e6588fb4d3c9051c893\` (\`employee_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_contractors_contractor_id\` ON \`contractors\` (\`contractor_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_employees_employee_id\` ON \`employees\` (\`employee_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`UQ_employees_employee_id\` ON \`employees\``);
        await queryRunner.query(`DROP INDEX \`UQ_contractors_contractor_id\` ON \`contractors\``);
        await queryRunner.query(`ALTER TABLE \`employees\` DROP INDEX \`IDX_c9a09b8e6588fb4d3c9051c893\``);
        await queryRunner.query(`ALTER TABLE \`contractors\` DROP INDEX \`IDX_a5a70dc7116719427753733112\``);
        await queryRunner.query(`ALTER TABLE \`employees\` CHANGE \`employee_id\` \`user_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`ALTER TABLE \`contractors\` CHANGE \`contractor_id\` \`user_id\` bigint UNSIGNED NOT NULL AUTO_INCREMENT`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_employees_user_id\` ON \`employees\` (\`user_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`UQ_contractors_user_id\` ON \`contractors\` (\`user_id\`)`);
    }

}
