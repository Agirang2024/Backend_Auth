import { Body, Controller, Post, Request, UseGuards } from "@nestjs/common";
import { GptService } from "./gpt.service";
import { CallGptDTO } from "./dto/gpt.dto";
import { JWTAuthGuard } from "src/auth/Guards/jwt.auth-guard";

@UseGuards(JWTAuthGuard)
@Controller("gpt")
export class GptController {
  constructor(private readonly gptService: GptService) {}

  @Post()
  async callGPT(@Body() callGptDTO: CallGptDTO, @Request() req) {
    const { userId } = req.user;
    return await this.gptService.callGPT(userId, callGptDTO);
  }
}
