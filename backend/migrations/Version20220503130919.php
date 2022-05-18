<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220503130919 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE report_staff_person (report_id INT NOT NULL, staff_person_id INT NOT NULL, INDEX IDX_3FCBF3544BD2A4C0 (report_id), INDEX IDX_3FCBF35410376B08 (staff_person_id), PRIMARY KEY(report_id, staff_person_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE report_staff_person ADD CONSTRAINT FK_3FCBF3544BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE report_staff_person ADD CONSTRAINT FK_3FCBF35410376B08 FOREIGN KEY (staff_person_id) REFERENCES staff_person (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE location CHANGE latitude latitude DOUBLE PRECISION DEFAULT NULL, CHANGE longitude longitude DOUBLE PRECISION DEFAULT NULL, CHANGE description description VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE media_object DROP category, CHANGE report_id report_id INT DEFAULT NULL, CHANGE file_path file_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE report DROP FOREIGN KEY FK_C42F778458DA0EE5');
        $this->addSql('DROP INDEX IDX_C42F778458DA0EE5 ON report');
        $this->addSql('ALTER TABLE report DROP assigned_person_id, CHANGE description description VARCHAR(255) DEFAULT NULL, CHANGE close_date close_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE report_staff_person');
        $this->addSql('ALTER TABLE location CHANGE latitude latitude DOUBLE PRECISION DEFAULT \'NULL\', CHANGE longitude longitude DOUBLE PRECISION DEFAULT \'NULL\', CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE media_object ADD category VARCHAR(255) CHARACTER SET utf8mb4 NOT NULL COLLATE `utf8mb4_unicode_ci`, CHANGE report_id report_id INT DEFAULT NULL, CHANGE file_path file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE report ADD assigned_person_id INT DEFAULT NULL, CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE close_date close_date DATETIME DEFAULT \'NULL\'');
        $this->addSql('ALTER TABLE report ADD CONSTRAINT FK_C42F778458DA0EE5 FOREIGN KEY (assigned_person_id) REFERENCES staff_person (id)');
        $this->addSql('CREATE INDEX IDX_C42F778458DA0EE5 ON report (assigned_person_id)');
    }
}
