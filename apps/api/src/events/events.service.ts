import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateEventDto } from './dto/create-event.dto';

@Injectable()
export class EventsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateEventDto) {
    const booking = await this.prisma.booking.findUnique({
      where: {
        id: dto.bookingId,
      },
    });

    if (!booking) {
      throw new NotFoundException('Booking not found');
    }

    return this.prisma.event.create({
      data: {
        bookingId: dto.bookingId,
        title: dto.title,
        eventType: dto.eventType,
        startDate: new Date(dto.startDate),
        endDate: dto.endDate ? new Date(dto.endDate) : null,
        venue: dto.venue,
        city: dto.city,
        state: dto.state,
      },
    });
  }

  async findAll() {
    return this.prisma.event.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        booking: {
          include: {
            client: true,
          },
        },
      },
      orderBy: {
        startDate: 'asc',
      },
    });
  }
}