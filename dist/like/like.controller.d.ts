import { LikeService } from "./like.service";
export declare class LikeController {
    private readonly likeService;
    constructor(likeService: LikeService);
    like(politicsId: string, req: any): Promise<{
        id: string;
        created_at: Date;
        user_id: string;
        politics_id: string;
    }>;
    dislike(politicsId: string, req: any): Promise<void>;
}
