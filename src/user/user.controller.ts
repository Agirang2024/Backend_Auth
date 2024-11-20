import { Body, Controller, Param, Patch } from "@nestjs/common";
import { UserService } from "./user.service";
import { EditProfileDTO } from "./dto/user.dto";

@Controller("user")
export class UserController {
  constructor(private readonly userSerivce: UserService) {}

  @Patch(":id")
  async editProfile(
    @Body() editProfileDTO: EditProfileDTO,
    @Param("id") id: string
  ) {
    return await this.userSerivce.editProfile(id, editProfileDTO);
  }
}
