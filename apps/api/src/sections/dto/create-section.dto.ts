import { ApiProperty } from '@nestjs/swagger';
import { SectionType } from '@prisma/client';
import {
  IsEnum,
  IsInt,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateSectionDto {
  @ApiProperty({
    example: 'cmf_album_id',
  })
  @IsString()
  albumId: string;

  @ApiProperty({
    example: 'Bride',
  })
  @IsString()
  title: string;

  @ApiProperty({
    enum: SectionType,
    example: SectionType.MANUAL,
    required: false,
  })
  @IsOptional()
  @IsEnum(SectionType)
  type?: SectionType;

  @ApiProperty({
    example: 'Bride portraits',
    required: false,
  })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({
    example: 1,
    required: false,
  })
  @IsOptional()
  @IsInt()
  sortOrder?: number;
}