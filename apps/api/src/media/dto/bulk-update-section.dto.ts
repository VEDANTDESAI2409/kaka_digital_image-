import {
  ArrayMinSize,
  IsArray,
  IsString,
} from 'class-validator';

export class BulkUpdateSectionDto {
  @IsArray()
  @ArrayMinSize(1)
  @IsString({
    each: true,
  })
  mediaIds: string[];

  @IsString()
  sectionId: string;
}