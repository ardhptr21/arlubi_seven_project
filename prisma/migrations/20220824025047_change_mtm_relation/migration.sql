/*
  Warnings:

  - The primary key for the `users_on_extracurriculars` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id` on the `users_on_extracurriculars` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `users_on_extracurriculars` DROP PRIMARY KEY,
    DROP COLUMN `id`,
    ADD PRIMARY KEY (`user_id`, `extracurricular_id`);
