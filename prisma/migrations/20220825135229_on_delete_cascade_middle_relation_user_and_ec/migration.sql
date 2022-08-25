-- DropForeignKey
ALTER TABLE `users_on_extracurriculars` DROP FOREIGN KEY `users_on_extracurriculars_extracurricular_id_fkey`;

-- DropForeignKey
ALTER TABLE `users_on_extracurriculars` DROP FOREIGN KEY `users_on_extracurriculars_user_id_fkey`;

-- AddForeignKey
ALTER TABLE `users_on_extracurriculars` ADD CONSTRAINT `users_on_extracurriculars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_on_extracurriculars` ADD CONSTRAINT `users_on_extracurriculars_extracurricular_id_fkey` FOREIGN KEY (`extracurricular_id`) REFERENCES `extracurriculars`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
