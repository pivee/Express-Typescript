import {
  IsString
} from 'class-validator';

export class CreatePostDTO {

  @IsString()
  public author: string;

  @IsString()
  public title: string;

  @IsString()
  public content: string;

}
