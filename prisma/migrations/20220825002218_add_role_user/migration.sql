-- AlterTable
ALTER TABLE `users` ADD COLUMN `role` ENUM('admin', 'user') NOT NULL DEFAULT 'user',
    MODIFY `nis` VARCHAR(191) NULL,
    MODIFY `class` VARCHAR(191) NULL;
