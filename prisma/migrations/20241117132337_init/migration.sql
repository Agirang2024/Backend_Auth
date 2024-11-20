/*
  Warnings:

  - You are about to drop the column `story` on the `Story` table. All the data in the column will be lost.
  - Added the required column `user_id` to the `Story` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Story" DROP COLUMN "story",
ADD COLUMN     "user_id" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "StoryDetail" (
    "id" TEXT NOT NULL,
    "page" INTEGER NOT NULL,
    "content" TEXT NOT NULL,
    "media_url" TEXT NOT NULL,
    "story_id" TEXT NOT NULL,

    CONSTRAINT "StoryDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "StoryDetail" ADD CONSTRAINT "StoryDetail_story_id_fkey" FOREIGN KEY ("story_id") REFERENCES "Story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
