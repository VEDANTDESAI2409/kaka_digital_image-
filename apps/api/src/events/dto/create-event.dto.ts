import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';

import { EventType } from '@prisma/client';

export class CreateEventDto {
  @IsString()
  bookingId: string;

  @IsString()
  title: string;

  @IsEnum(EventType)
  eventType: EventType;

  @IsDateString()
  startDate: string;

  @IsOptional()
  @IsDateString()
  endDate?: string;

  @IsOptional()
  @IsString()
  venue?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;
}