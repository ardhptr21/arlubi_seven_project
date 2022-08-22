-- CreateTable
CREATE TABLE `extracurriculars` (
    `id` VARCHAR(191) NOT NULL,
    `name` VARCHAR(191) NOT NULL,
    `short` VARCHAR(191) NOT NULL,
    `long` VARCHAR(191) NOT NULL,
    `slug` VARCHAR(191) NOT NULL,
    `header_image` VARCHAR(191) NULL,
    `created_at` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updated_at` DATETIME(3) NOT NULL,

    UNIQUE INDEX `extracurriculars_slug_key`(`slug`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
