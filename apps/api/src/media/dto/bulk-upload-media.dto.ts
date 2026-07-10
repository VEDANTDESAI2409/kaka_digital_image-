import {
  IsOptional,
  IsString,
} from 'class-validator';

export class BulkUploadMediaDto {
  @IsString()
  eventId: string;

  @IsString()
  albumId: string;

  @IsOptional()
  @IsString()
  sectionId?: string;
}