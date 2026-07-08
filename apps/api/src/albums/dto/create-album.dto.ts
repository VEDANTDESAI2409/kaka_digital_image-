import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'cmf0abc123',
  })
  @IsString()
  eventId: string;

  @ApiProperty({
    example: 'Wedding',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Main wedding ceremony photos',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;
}