/*
  Warnings:

  - You are about to alter the column `status` on the `RoomEquipment` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `Enum(EnumId(1))`.

*/
-- AlterTable
ALTER TABLE `RoomEquipment` MODIFY `status` ENUM('PENDENTE', 'DEVOLVIDO', 'ATRASADO') NOT NULL DEFAULT 'PENDENTE';

-- AlterTable
ALTER TABLE `User` ADD COLUMN `type` ENUM('USER', 'ADMIN') NOT NULL DEFAULT 'USER';
