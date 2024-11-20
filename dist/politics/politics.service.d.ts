import { PrismaService } from "src/prisma/prisma.service";
export declare class PoliticsService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getAllPolitics(userId: string): Promise<any[]>;
    getPoliticsById(politicsId: string, userId: string): Promise<{
        liked: boolean;
        likes: {
            id: string;
            created_at: Date;
            user_id: string;
            politics_id: string;
        }[];
        id: string;
        created_at: Date;
        title: string;
        content: string;
        target: string;
        condition: string;
        support: string;
    }>;
    getRecommendedPolitics(userId: string): Promise<any[]>;
    getLikedPolitics(userId: string): Promise<any[]>;
    private addLikedStatus;
}
