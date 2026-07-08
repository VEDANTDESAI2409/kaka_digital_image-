import { IsEnum, IsOptional, IsString } from 'class-validator';
import { MediaStatus } from '@prisma/client';

export class UpdateMediaDto {
  @IsOptional()
  @IsString()
  sectionId?: string;

  @IsOptional()
  @IsEnum(MediaStatus)
  status?: MediaStatus;
}