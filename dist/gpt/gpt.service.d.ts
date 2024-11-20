import { HttpService } from "@nestjs/axios";
import { CallGptDTO } from "./dto/gpt.dto";
import { PrismaService } from "src/prisma/prisma.service";
export declare class GptService {
    private httpService;
    private prisma;
    constructor(httpService: HttpService, prisma: PrismaService);
    delay(ms: number): Promise<unknown>;
    callGPT(userId: string, callGptDTO: CallGptDTO): Promise<{
        story: {
            id: string;
            created_at: Date;
            title: string;
            user_id: string;
        };
        details: any;
    }>;
}
