import { UserService } from "./user.service";
import { EditProfileDTO } from "./dto/user.dto";
export declare class UserController {
    private readonly userSerivce;
    constructor(userSerivce: UserService);
    editProfile(editProfileDTO: EditProfileDTO, id: string): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
