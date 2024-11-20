import { IsOptional, IsString } from "class-validator";

export class EditProfileDTO {
  @IsOptional()
  @IsString()
  username: string;

  @IsOptional()
  @IsString()
  location: string;

  @IsOptional()
  @IsString()
  baby_born: string;
}
