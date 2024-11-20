import {
  Controller,
  Get,
  Param,
  Query,
  Request,
  UseGuards,
} from "@nestjs/common";
import { PoliticsService } from "./politics.service";
import { JWTAuthGuard } from "src/auth/Guards/jwt.auth-guard";

@UseGuards(JWTAuthGuard)
@Controller("politics")
export class PoliticsController {
  constructor(private readonly politicsService: PoliticsService) {}

  @Get()
  async getAllPolitics(@Request() req) {
    const { userId } = req.user;
    return await this.politicsService.getAllPolitics(userId);
  }

  @Get("/recommended")
  async getRecommendedPolitics(@Request() req) {
    const { userId } = req.user;
    return await this.politicsService.getRecommendedPolitics(userId);
  }

  @Get("/liked")
  async getLikedPolitics(@Request() req) {
    const { userId } = req.user;
    return await this.politicsService.getLikedPolitics(userId);
  }

  @Get(":politicsId")
  async getPoliticsById(
    @Param("politicsId") politicsId: string,
    @Request() req
  ) {
    const { userId } = req.user;
    return await this.politicsService.getPoliticsById(politicsId, userId);
  }
}
