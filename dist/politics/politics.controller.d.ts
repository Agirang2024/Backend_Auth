import { PoliticsService } from "./politics.service";
export declare class PoliticsController {
    private readonly politicsService;
    constructor(politicsService: PoliticsService);
    getAllPolitics(req: any): Promise<any[]>;
    getRecommendedPolitics(req: any): Promise<any[]>;
    getLikedPolitics(req: any): Promise<any[]>;
    getPoliticsById(politicsId: string, req: any): Promise<{
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
}
