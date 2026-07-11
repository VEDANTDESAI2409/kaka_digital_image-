import { IsEnum, IsIn, IsOptional, IsString } from 'class-validator';
import { Type } from 'class-transformer';
import { BookingStatus } from '@prisma/client';
import { PaginationQueryDto } from '../../common/dto/pagination-query.dto';

export class BookingQueryDto extends PaginationQueryDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsEnum(BookingStatus)
  status?: BookingStatus;

  @IsOptional()
  @IsIn([
    'createdAt',
    'title',
    'bookingNumber',
    'quotationAmount',
  ])
  sortBy?:
    | 'createdAt'
    | 'title'
    | 'bookingNumber'
    | 'quotationAmount';

  @IsOptional()
  @IsIn(['asc', 'desc'])
  order?: 'asc' | 'desc';
}