import { StoryService } from "./story.service";
export declare class StoryController {
    private readonly storyService;
    constructor(storyService: StoryService);
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
