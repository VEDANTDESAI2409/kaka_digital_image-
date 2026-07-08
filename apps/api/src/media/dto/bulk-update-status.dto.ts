import {
  ArrayMinSize,
  IsArray,
  IsEnum,
  IsString,
} from 'class-validator';

import { MediaStatus } from '@prisma/client';

export class BulkUpdateStatusDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  mediaIds: string[];

  @IsEnum(MediaStatus)
  status: MediaStatus;
}