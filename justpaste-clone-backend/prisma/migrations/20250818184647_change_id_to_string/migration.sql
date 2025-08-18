/*
  Warnings:

  - The primary key for the `Text` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- AlterTable
ALTER TABLE "public"."Text" DROP CONSTRAINT "Text_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "Text_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Text_id_seq";
