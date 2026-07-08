import { IsEnum, IsString } from 'class-validator';
import { MediaType } from '@prisma/client';

export class UploadMediaDto {
  @IsString()
  eventId: string;

  @IsString()
  albumId: string;

  @IsEnum(MediaType)
  type: MediaType;
}