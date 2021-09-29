<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20210929160859 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE media_object ADD report_id INT DEFAULT NULL, CHANGE file_path file_path VARCHAR(255) DEFAULT NULL');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D431324BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('CREATE INDEX IDX_14D431324BD2A4C0 ON media_object (report_id)');
        $this->addSql('ALTER TABLE report CHANGE description description VARCHAR(255) DEFAULT NULL, CHANGE close_date close_date DATETIME DEFAULT NULL');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE media_object DROP FOREIGN KEY FK_14D431324BD2A4C0');
        $this->addSql('DROP INDEX IDX_14D431324BD2A4C0 ON media_object');
        $this->addSql('ALTER TABLE media_object DROP report_id, CHANGE file_path file_path VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`');
        $this->addSql('ALTER TABLE report CHANGE description description VARCHAR(255) CHARACTER SET utf8mb4 DEFAULT \'NULL\' COLLATE `utf8mb4_unicode_ci`, CHANGE close_date close_date DATETIME DEFAULT \'NULL\'');
    }
}
