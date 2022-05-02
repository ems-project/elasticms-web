<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20220502132251 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE asset_storage (id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL, created DATETIME NOT NULL, modified DATETIME NOT NULL, hash VARCHAR(1024) NOT NULL, contents BLOB NOT NULL, size BIGINT NOT NULL, confirmed BOOLEAN DEFAULT \'0\' NOT NULL)');
        $this->addSql('CREATE UNIQUE INDEX UNIQ_37945A62D1B862B8 ON asset_storage (hash)');
        $this->addSql('CREATE TABLE form_submission (id CHAR(36) NOT NULL --(DC2Type:uuid)
        , created DATETIME NOT NULL, modified DATETIME NOT NULL, name VARCHAR(255) NOT NULL, instance VARCHAR(255) NOT NULL, locale VARCHAR(2) NOT NULL, data CLOB DEFAULT NULL --(DC2Type:json_array)
        , expire_date DATE DEFAULT NULL, label VARCHAR(255) NOT NULL, process_try_counter INTEGER DEFAULT 0 NOT NULL, process_id VARCHAR(255) DEFAULT NULL, process_by VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE TABLE form_submission_file (id CHAR(36) NOT NULL --(DC2Type:uuid)
        , form_submission_id CHAR(36) DEFAULT NULL --(DC2Type:uuid)
        , created DATETIME NOT NULL, modified DATETIME NOT NULL, file BLOB NOT NULL, filename VARCHAR(255) NOT NULL, form_field VARCHAR(255) NOT NULL, mime_type VARCHAR(1024) NOT NULL, size BIGINT NOT NULL, PRIMARY KEY(id))');
        $this->addSql('CREATE INDEX IDX_AEFF00A6422B0E0C ON form_submission_file (form_submission_id)');
        $this->addSql('CREATE TABLE log_message (id CHAR(36) NOT NULL --(DC2Type:uuid)
        , created DATETIME NOT NULL, modified DATETIME NOT NULL, message CLOB NOT NULL, context CLOB NOT NULL --(DC2Type:json)
        , level SMALLINT NOT NULL, level_name VARCHAR(50) NOT NULL, channel VARCHAR(255) NOT NULL, extra CLOB NOT NULL --(DC2Type:json)
        , formatted CLOB NOT NULL, username VARCHAR(255) DEFAULT NULL, impersonator VARCHAR(255) DEFAULT NULL, PRIMARY KEY(id))');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('DROP TABLE asset_storage');
        $this->addSql('DROP TABLE form_submission');
        $this->addSql('DROP TABLE form_submission_file');
        $this->addSql('DROP TABLE log_message');
    }
}
