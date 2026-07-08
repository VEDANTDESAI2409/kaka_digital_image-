import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';

@Injectable()
export class BookingsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBookingDto) {
  const client = await this.prisma.client.findUnique({
    where: {
      id: dto.clientId,
    },
  });

  if (!client) {
    throw new NotFoundException('Client not found');
  }

  const bookingCount = await this.prisma.booking.count();

  const bookingNumber = `KDI-${new Date().getFullYear()}-${String(
    bookingCount + 1,
  ).padStart(4, '0')}`;

  const remainingAmount =
    dto.quotationAmount - dto.advanceAmount;

  return this.prisma.$transaction(async (tx) => {
    const booking = await tx.booking.create({
      data: {
        bookingNumber,
        clientId: dto.clientId,
        title: dto.title,
        description: dto.description,
        quotationAmount: dto.quotationAmount,
        advanceAmount: dto.advanceAmount,
        remainingAmount,
        services: dto.services,
      },
    });

    for (const event of dto.events) {
      await tx.event.create({
        data: {
          bookingId: booking.id,
          title: event.title,
          eventType: event.eventType,
          startDate: new Date(event.startDate),
          endDate: event.endDate
            ? new Date(event.endDate)
            : null,
          venue: event.venue,
          city: event.city,
          state: event.state,
        },
      });
    }

    return tx.booking.findUnique({
      where: {
        id: booking.id,
      },
      include: {
        events: true,
        client: true,
      },
    });
  });
}

  async findAll() {
    return this.prisma.booking.findMany({
      where: {
        deletedAt: null,
      },
      include: {
        client: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}