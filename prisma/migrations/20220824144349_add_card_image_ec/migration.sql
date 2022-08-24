-- AlterTable
ALTER TABLE `extracurriculars` ADD COLUMN `card_image` VARCHAR(191) NULL;

-- AlterTable
ALTER TABLE `users` MODIFY `nis` VARCHAR(191) NOT NULL;
