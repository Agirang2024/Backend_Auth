import { Module } from "@nestjs/common";
import { AuthModule } from "./auth/auth.module";
import { GptModule } from "./gpt/gpt.module";
import { StoryModule } from "./story/story.module";
import { PrismaModule } from "./prisma/prisma.module";
import { PoliticsModule } from "./politics/politics.module";
import { LikeModule } from "./like/like.module";
import { UserModule } from './user/user.module';

@Module({
  imports: [
    GptModule,
    StoryModule,
    PrismaModule,
    PoliticsModule,
    LikeModule,
    AuthModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
