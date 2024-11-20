import { Module } from "@nestjs/common";
import { PoliticsController } from "./politics.controller";
import { PoliticsService } from "./politics.service";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  controllers: [PoliticsController],
  providers: [PoliticsService, PrismaService],
})
export class PoliticsModule {}
