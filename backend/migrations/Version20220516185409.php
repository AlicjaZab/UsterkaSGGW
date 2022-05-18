<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220516185409 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE category (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE location (id INT AUTO_INCREMENT NOT NULL, report_id INT NOT NULL, latitude DOUBLE PRECISION DEFAULT NULL, longitude DOUBLE PRECISION DEFAULT NULL, description VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_5E9E89CB4BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE media_object (id INT AUTO_INCREMENT NOT NULL, report_id INT DEFAULT NULL, file_path VARCHAR(255) DEFAULT NULL, INDEX IDX_14D431324BD2A4C0 (report_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE report (id INT AUTO_INCREMENT NOT NULL, category VARCHAR(50) NOT NULL, description VARCHAR(255) DEFAULT NULL, status VARCHAR(50) NOT NULL, create_date DATETIME NOT NULL, close_date DATETIME DEFAULT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE report_staff_person (report_id INT NOT NULL, staff_person_id INT NOT NULL, INDEX IDX_3FCBF3544BD2A4C0 (report_id), INDEX IDX_3FCBF35410376B08 (staff_person_id), PRIMARY KEY(report_id, staff_person_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE staff_person (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(50) NOT NULL, surname VARCHAR(50) NOT NULL, email VARCHAR(100) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE staff_person_category (staff_person_id INT NOT NULL, category_id INT NOT NULL, INDEX IDX_119A133410376B08 (staff_person_id), INDEX IDX_119A133412469DE2 (category_id), PRIMARY KEY(staff_person_id, category_id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE location ADD CONSTRAINT FK_5E9E89CB4BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE media_object ADD CONSTRAINT FK_14D431324BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id)');
        $this->addSql('ALTER TABLE report_staff_person ADD CONSTRAINT FK_3FCBF3544BD2A4C0 FOREIGN KEY (report_id) REFERENCES report (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE report_staff_person ADD CONSTRAINT FK_3FCBF35410376B08 FOREIGN KEY (staff_person_id) REFERENCES staff_person (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE staff_person_category ADD CONSTRAINT FK_119A133410376B08 FOREIGN KEY (staff_person_id) REFERENCES staff_person (id) ON DELETE CASCADE');
        $this->addSql('ALTER TABLE staff_person_category ADD CONSTRAINT FK_119A133412469DE2 FOREIGN KEY (category_id) REFERENCES category (id) ON DELETE CASCADE');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE staff_person_category DROP FOREIGN KEY FK_119A133412469DE2');
        $this->addSql('ALTER TABLE location DROP FOREIGN KEY FK_5E9E89CB4BD2A4C0');
        $this->addSql('ALTER TABLE media_object DROP FOREIGN KEY FK_14D431324BD2A4C0');
        $this->addSql('ALTER TABLE report_staff_person DROP FOREIGN KEY FK_3FCBF3544BD2A4C0');
        $this->addSql('ALTER TABLE report_staff_person DROP FOREIGN KEY FK_3FCBF35410376B08');
        $this->addSql('ALTER TABLE staff_person_category DROP FOREIGN KEY FK_119A133410376B08');
        $this->addSql('DROP TABLE category');
        $this->addSql('DROP TABLE location');
        $this->addSql('DROP TABLE media_object');
        $this->addSql('DROP TABLE report');
        $this->addSql('DROP TABLE report_staff_person');
        $this->addSql('DROP TABLE staff_person');
        $this->addSql('DROP TABLE staff_person_category');
    }
}
