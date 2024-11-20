import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { EditProfileDTO } from "./dto/user.dto";

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async editProfile(userId: string, editProfileDTO: EditProfileDTO) {
    const { baby_born, location, username } = editProfileDTO;

    return await this.prisma.user.updateMany({
      where: { id: userId },
      data: {
        baby_born,
        username,
        location,
      },
    });
  }
}
