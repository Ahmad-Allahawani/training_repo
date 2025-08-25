/*
  Warnings:

  - You are about to drop the `Text` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "public"."Text";

-- CreateTable
CREATE TABLE "public"."TextWithHtml" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TextWithHtml_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TextWithOutHtml" (
    "id" TEXT NOT NULL,
    "text" TEXT NOT NULL,

    CONSTRAINT "TextWithOutHtml_pkey" PRIMARY KEY ("id")
);
