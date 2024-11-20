import { Module } from "@nestjs/common";
import { GptController } from "./gpt.controller";
import { GptService } from "./gpt.service";
import { HttpModule } from "@nestjs/axios";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
  imports: [HttpModule],
  controllers: [GptController],
  providers: [GptService, PrismaService],
})
export class GptModule {}
