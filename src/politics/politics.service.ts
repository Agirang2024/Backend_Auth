import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class PoliticsService {
  constructor(private readonly prisma: PrismaService) {}

  // 모든 정책 반환
  async getAllPolitics(userId: string) {
    const politics = await this.prisma.politics.findMany({
      orderBy: { created_at: "desc" },
      include: { likes: true },
    });

    return this.addLikedStatus(politics, userId);
  }

  // 특정 정책 반환
  async getPoliticsById(politicsId: string, userId: string) {
    const politics = await this.prisma.politics.findUnique({
      where: { id: politicsId },
      include: { likes: true },
    });

    // 단일 정책에 좋아요 상태 추가
    return {
      ...politics,
      liked: politics.likes.some((like) => like.user_id === userId),
    };
  }

  // 추천 정책 3개 반환
  async getRecommendedPolitics(userId: string) {
    const politics = await this.prisma.politics.findMany({
      orderBy: { created_at: "desc" },
      include: { likes: true },
      take: 3,
    });

    return this.addLikedStatus(politics, userId);
  }

  // 사용자가 좋아요한 정책 반환
  async getLikedPolitics(userId: string) {
    const politics = await this.prisma.politics.findMany({
      where: {
        likes: {
          some: { user_id: userId },
        },
      },
      include: { likes: true },
    });

    return this.addLikedStatus(politics, userId);
  }

  // 정책 리스트에 좋아요 상태 추가
  private addLikedStatus(politics: any[], userId: string) {
    return politics.map((politic) => ({
      ...politic,
      liked: politic.likes.some((like) => like.user_id === userId),
    }));
  }
}
