import { Injectable } from "@nestjs/common";
import { HttpService } from "@nestjs/axios";
import { AxiosResponse } from "axios";
import { lastValueFrom } from "rxjs";
import { CallGptDTO } from "./dto/gpt.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { StoryDetail } from "@prisma/client";
@Injectable()
export class GptService {
  constructor(
    private httpService: HttpService,
    private prisma: PrismaService
  ) {}

  async delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  async callGPT(userId: string, callGptDTO: CallGptDTO) {
    const { character, theme } = callGptDTO;
    // GPT 호출 로직
    const prompt = [
      {
        role: "system",
        content: `
        다음 JSON 형식을 따르는 이야기 데이터를 반환해줘.
        네 데이터를 데이터베이스에 넣을 거야.
        말 끝은 "~했어요". 이렇게 해줘.
        스토리의 주인공은 ${character} 이고, 테마는 ${theme} 으로 해줘.
        JSON 이외의 다른 멘트들은 쓰지 말고, JSON만 반환해줘.
        JSON 타입은 다음과 같아.

        {
          "title": "string",
          "detail": [
            {
              "page": 1,
              "content": "string",
              "mediaUrl": "string"  // 나중에 DALL-E에서 받은 이미지로 대체될 것임.
            }
          ]
        }

        이제 예시 데이터를 보여 줄게. 이 데이터를 참고해줘: 

        {
          "title": "아기 새, 날아오르다!",
          "detail": [
            {
              "page": 1,
              "content": "옛날 옛적에 작은 아기 새가 살았어요.",
              "mediaUrl": "https://example.com/page1_image.jpg"
            },
            {
              "page": 2,
              "content": "아기 새는 날개를 펄럭이며 하늘을 바라보았어요.",
              "mediaUrl": "https://example.com/page2_image.jpg"
            },
            {
              "page": 3,
              "content": "아기 새는 언젠가 하늘을 날고 싶었어요.",
              "mediaUrl": "https://example.com/page3_image.jpg"
            },
            {
              "page": 4,
              "content": "엄마 새는 아기 새에게 날개짓을 가르쳐 주었어요.",
              "mediaUrl": "https://example.com/page4_image.jpg"
            },
            {
              "page": 5,
              "content": "아기 새는 용기를 내어 둥지 가장자리에 섰어요.",
              "mediaUrl": "https://example.com/page5_image.jpg"
            },
            {
              "page": 6,
              "content": "하나, 둘, 셋! 아기 새가 날개를 펼쳤어요!",
              "mediaUrl": "https://example.com/page6_image.jpg"
            },
            {
              "page": 7,
              "content": "아기 새는 드디어 하늘을 날기 시작했어요!",
              "mediaUrl": "https://example.com/page7_image.jpg"
            },
            {
              "page": 8,
              "content": "엄마 새는 하늘에서 아기 새를 자랑스럽게 바라보았어요.",
              "mediaUrl": "https://example.com/page8_image.jpg"
            }
          ]
        }
        `,
      },
    ];

    const response: AxiosResponse<any> = await lastValueFrom(
      this.httpService.post(
        "https://api.openai.com/v1/chat/completions",
        {
          model: "gpt-4",
          messages: prompt,
          max_tokens: 4096,
          temperature: 0.4,
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.API_KEY}`,
            "Content-Type": "application/json",
          },
        }
      )
    );

    const content = response.data.choices[0].message.content;
    console.log("gpt 응답:", content);
    const storyData = JSON.parse(content); // JSON으로 변환

    // DALL-E 호출 로직
    for (const detail of storyData.detail) {
      await this.delay(2000);
      const imagePrompt = `I want to create an illustration for a children's storybook. Please design an image that visually represents the mood and content of the sentence: "${detail.prompt}". The illustration should have a soft, warm color palette and emphasize a whimsical, storybook-like style.`;
      const imageResponse: AxiosResponse<any> = await lastValueFrom(
        this.httpService.post(
          "https://api.openai.com/v1/images/generations",
          {
            prompt: imagePrompt,
            n: 1,
            size: "256x256",
          },
          {
            headers: {
              Authorization: `Bearer ${process.env.API_KEY}`,
              "Content-Type": "application/json",
            },
            timeout: 1000 * 60 * 3, // 3분
          }
        )
      );

      detail.media_url = imageResponse.data.data[0].url;
    }

    // Story 저장
    const createdStory = await this.prisma.story.create({
      data: {
        title: storyData.title,
        user_id: userId,
      },
    });

    // StoryDetail 저장
    const storyDetails = storyData.detail.map((detail: StoryDetail) => ({
      page: detail.page,
      content: detail.content,
      media_url: detail.media_url,
      story_id: createdStory.id,
    }));

    await this.prisma.storyDetail.createMany({ data: storyDetails });

    console.log(storyDetails);

    return {
      story: createdStory,
      details: storyDetails,
    };
  }
}
