import { IsString, IsInt } from 'class-validator';

export class CreateFileDto {
  id: number;
  @IsString()
  name: string;
  @IsString()
  ext: string;
  mimeType: string;
  @IsInt()
  size: number;
  uploadedDate: Date;
}
