import {
  Controller,
  Param,
  Post,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { LikeService } from "./like.service";
import { JWTAuthGuard } from "src/auth/Guards/jwt.auth-guard";

@UseGuards(JWTAuthGuard)
@Controller("like")
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

  @Post(":politicsId")
  async like(@Param("politicsId") politicsId: string, @Request() req) {
    const { userId } = req.user;
    return await this.likeService.like(politicsId, userId);
  }

  @Delete(":politicsId")
  async dislike(@Param("politicsId") politicsId: string, @Request() req) {
    const { userId } = req.user;
    await this.likeService.dislike(politicsId, userId);
  }
}
