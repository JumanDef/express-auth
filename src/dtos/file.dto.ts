import { IsString, IsInt } from 'class-validator';

export class CreateFileDto {
  id: number;
  @IsString()
  file_name: string;
  @IsString()
  ext: string;
  mimeType: string;
  @IsInt()
  size: number;
}
