-- CreateTable
CREATE TABLE `users_on_extracurriculars` (
    `id` VARCHAR(191) NOT NULL,
    `user_id` VARCHAR(191) NOT NULL,
    `extracurricular_id` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `users_on_extracurriculars` ADD CONSTRAINT `users_on_extracurriculars_user_id_fkey` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `users_on_extracurriculars` ADD CONSTRAINT `users_on_extracurriculars_extracurricular_id_fkey` FOREIGN KEY (`extracurricular_id`) REFERENCES `extracurriculars`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
