import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { BookingsService } from './bookings.service';

import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';

@Controller('bookings')
@UseGuards(JwtAuthGuard)
export class BookingsController {
  constructor(
    private readonly bookingsService: BookingsService,
  ) {}

  //////////////////////////////////////////////////////
  // CREATE BOOKING
  //////////////////////////////////////////////////////

  @Post()
  create(
    @Body()
    dto: CreateBookingDto,
  ) {
    return this.bookingsService.create(dto);
  }

  //////////////////////////////////////////////////////
  // GET ALL BOOKINGS
  //////////////////////////////////////////////////////

  @Get()
  findAll(
    @Query()
    query: BookingQueryDto,
  ) {
    return this.bookingsService.findAll(query);
  }

  //////////////////////////////////////////////////////
  // GET BOOKING BY ID
  //////////////////////////////////////////////////////

  @Get(':id')
  findOne(
    @Param('id')
    id: string,
  ) {
    return this.bookingsService.findOne(id);
  }

  //////////////////////////////////////////////////////
  // UPDATE BOOKING
  //////////////////////////////////////////////////////

  @Patch(':id')
  update(
    @Param('id')
    id: string,

    @Body()
    dto: UpdateBookingDto,
  ) {
    return this.bookingsService.update(
      id,
      dto,
    );
  }

  //////////////////////////////////////////////////////
  // DELETE BOOKING
  //////////////////////////////////////////////////////

  @Delete(':id')
  remove(
    @Param('id')
    id: string,
  ) {
    return this.bookingsService.remove(id);
  }
}