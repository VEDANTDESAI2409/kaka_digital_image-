import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

import { Type } from 'class-transformer';
import {
  MediaStatus,
  MediaType,
} from '@prisma/client';

export class GetMediaDto {
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page = 1;

  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit = 20;

  @IsOptional()
  @IsString()
  eventId?: string;

  @IsOptional()
  @IsString()
  albumId?: string;

  @IsOptional()
  @IsString()
  sectionId?: string;

  @IsOptional()
  @IsEnum(MediaType)
  type?: MediaType;

  @IsOptional()
  @IsEnum(MediaStatus)
  status?: MediaStatus;

  @IsOptional()
  @IsString()
  search?: string;
}