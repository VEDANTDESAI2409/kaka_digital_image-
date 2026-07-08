import {
  IsArray,
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

import { Type } from 'class-transformer';
import { EventType } from '@prisma/client';

class CreateBookingEventDto {
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

export class CreateBookingDto {
  @IsString()
  clientId: string;

  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsNumber()
  quotationAmount: number;

  @IsNumber()
  advanceAmount: number;

  @IsOptional()
  @IsArray()
  services?: string[];

  @ValidateNested({ each: true })
  @Type(() => CreateBookingEventDto)
  @IsArray()
  events: CreateBookingEventDto[];
}