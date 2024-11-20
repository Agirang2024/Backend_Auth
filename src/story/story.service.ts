import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class StoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getStoriesPreviewById(userId: string) {
    return await this.prisma.story.findMany({
      where: { user_id: userId },
      include: {
        detail: {
          select: {
            media_url: true,
          },
        },
      },
    });
  }

  async getStoriesDetailById(storyId: string) {
    const storyDetails = await this.prisma.storyDetail.findMany({
      where: { story_id: storyId },
      orderBy: { page: "asc" }, // 페이지 순서대로 정렬
    });
    return storyDetails;
  }
}
