import {
  IsString
} from "class-validator";

export class RegisterDTO {

  @IsString()
  public name: string;

  @IsString()
  public email: string;

  @IsString()
  public password: string;

}

export class LogInDTO {

  @IsString()
  public email: string;

  @IsString()
  public password: string;

}
