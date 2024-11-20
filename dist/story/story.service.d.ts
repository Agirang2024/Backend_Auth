import { PrismaService } from "src/prisma/prisma.service";
export declare class StoryService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getStoriesPreviewById(userId: string): Promise<({
        detail: {
            media_url: string;
        }[];
    } & {
        id: string;
        created_at: Date;
        title: string;
        user_id: string;
    })[]>;
    getStoriesDetailById(storyId: string): Promise<{
        id: string;
        created_at: Date;
        page: number;
        content: string;
        media_url: string;
        story_id: string;
    }[]>;
}
