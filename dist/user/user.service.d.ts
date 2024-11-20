import { PrismaService } from "src/prisma/prisma.service";
import { EditProfileDTO } from "./dto/user.dto";
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    editProfile(userId: string, editProfileDTO: EditProfileDTO): Promise<import(".prisma/client").Prisma.BatchPayload>;
}
