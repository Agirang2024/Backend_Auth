import { GptService } from "./gpt.service";
import { CallGptDTO } from "./dto/gpt.dto";
export declare class GptController {
    private readonly gptService;
    constructor(gptService: GptService);
    callGPT(callGptDTO: CallGptDTO, req: any): Promise<{
        story: {
            id: string;
            created_at: Date;
            title: string;
            user_id: string;
        };
        details: any;
    }>;
}
