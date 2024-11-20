import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
  constructor(private readonly prisma: PrismaService) {}

  async checkLiked(politicsId: string, userId: string) {
    return await this.prisma.like.findUnique({
      where: {
        politics_id_user_id: {
          politics_id: politicsId,
          user_id: userId,
        },
      },
    });
  }

  async like(politicsId: string, userId: string) {
    const likeExists = await this.checkLiked(politicsId, userId);

    if (likeExists) {
      throw new HttpException(
        "좋아요를 이미 누르고 있습니다",
        HttpStatus.BAD_REQUEST
      );
    }

    return await this.prisma.like.create({
      data: {
        politics_id: politicsId,
        user_id: userId,
      },
    });
  }

  async dislike(politicsId: string, userId: string) {
    const likeExists = await this.checkLiked(politicsId, userId);
    if (!likeExists) {
      throw new HttpException(
        "이미 좋아요를 누르고 있지 않습니다.",
        HttpStatus.BAD_REQUEST
      );
    }
    await this.prisma.like.delete({
      where: {
        politics_id_user_id: {
          politics_id: politicsId,
          user_id: userId,
        },
      },
    });
  }
}
