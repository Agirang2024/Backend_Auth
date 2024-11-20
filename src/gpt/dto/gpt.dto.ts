import { IsNotEmpty, IsString } from "class-validator";

export class CallGptDTO {
  @IsNotEmpty()
  @IsString()
  character: string;

  @IsNotEmpty()
  @IsString()
  theme: string;
}
