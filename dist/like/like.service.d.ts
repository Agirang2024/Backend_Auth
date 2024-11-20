import { PrismaService } from "src/prisma/prisma.service";
export declare class LikeService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    checkLiked(politicsId: string, userId: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        politics_id: string;
    }>;
    like(politicsId: string, userId: string): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        politics_id: string;
    }>;
    dislike(politicsId: string, userId: string): Promise<void>;
}
