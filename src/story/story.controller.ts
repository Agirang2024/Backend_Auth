import { Controller, Get, Param, UseGuards } from "@nestjs/common";
import { StoryService } from "./story.service";
import { JWTAuthGuard } from "src/auth/Guards/jwt.auth-guard";

@UseGuards(JWTAuthGuard)
@Controller("story")
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get("preview/:userId")
  async getStoriesPreviewById(@Param("userId") userId: string) {
    return await this.storyService.getStoriesPreviewById(userId);
  }

  @Get("detail/:storyId")
  async getStoriesDetailById(@Param("storyId") storyId: string) {
    return await this.storyService.getStoriesDetailById(storyId);
  }
}
