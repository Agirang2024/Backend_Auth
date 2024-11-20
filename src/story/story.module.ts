import { Module } from "@nestjs/common";
import { StoryController } from "./story.controller";
import { StoryService } from "./story.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [StoryController],
  providers: [StoryService, PrismaService],
})
export class StoryModule {}
