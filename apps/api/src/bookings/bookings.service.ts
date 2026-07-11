import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

import { Prisma, BookingStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { CreateBookingDto } from './dto/create-booking.dto';
import { UpdateBookingDto } from './dto/update-booking.dto';
import { BookingQueryDto } from './dto/booking-query.dto';

import { buildPaginationMeta } from '../common/utils/pagination.util';

@Injectable()
export class BookingsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  //////////////////////////////////////////////////////
  // CREATE BOOKING
  //////////////////////////////////////////////////////

  async create(dto: CreateBookingDto) {
    const client = await this.prisma.client.findUnique({
      where: {
        id: dto.clientId,
      },
    });

    if (!client) {
      throw new NotFoundException(
        'Client not found',
      );
    }

    const bookingCount =
      await this.prisma.booking.count();

    const bookingNumber = `KDI-${new Date().getFullYear()}-${String(
      bookingCount + 1,
    ).padStart(4, '0')}`;

    const quotationAmount =
      Number(dto.quotationAmount);

    const advanceAmount =
      Number(dto.advanceAmount);

    if (advanceAmount > quotationAmount) {
      throw new BadRequestException(
        'Advance amount cannot exceed quotation amount.',
      );
    }

    const remainingAmount =
      quotationAmount - advanceAmount;

    return this.prisma.$transaction(
      async (tx) => {
        const booking =
          await tx.booking.create({
            data: {
              bookingNumber,

              clientId: dto.clientId,

              title: dto.title,

              description:
                dto.description,

              quotationAmount,

              advanceAmount,

              remainingAmount,

              services:
                dto.services ?? [],

              status:
                BookingStatus.INQUIRY,
            },
          });

        if (
          dto.events &&
          dto.events.length > 0
        ) {
          for (const event of dto.events) {
            await tx.event.create({
              data: {
                bookingId:
                  booking.id,

                title: event.title,

                eventType:
                  event.eventType,

                startDate:
                  new Date(
                    event.startDate,
                  ),

                endDate:
                  event.endDate
                    ? new Date(
                        event.endDate,
                      )
                    : null,

                venue:
                  event.venue,

                city:
                  event.city,

                state:
                  event.state,
              },
            });
          }
        }

        return tx.booking.findUnique({
          where: {
            id: booking.id,
          },

          include: {
            client: true,

            events: true,
          },
        });
      },
    );
  }

  //////////////////////////////////////////////////////
  // GET ALL BOOKINGS
  //////////////////////////////////////////////////////

  async findAll(
   

    query: BookingQueryDto,
  ) {
    const {
      page,
      limit,
      search,
      status,
      sortBy,
      order,
    } = query;

    const skip =
      (page - 1) * limit;

    const where: Prisma.BookingWhereInput =
      {
        deletedAt: null,
      };

    if (search) {
      where.OR = [
        {
          bookingNumber: {
            contains: search,
            mode: Prisma.QueryMode
              .insensitive,
          },
        },

        {
          title: {
            contains: search,
            mode: Prisma.QueryMode
              .insensitive,
          },
        },

        {
          client: {
            primaryContactName: {
              contains: search,
              mode: Prisma.QueryMode
                .insensitive,
            },
          },
        },
      ];
    }

    if (status) {
      where.status = status;
    }

    const [items, total] =
      await this.prisma.$transaction([
        this.prisma.booking.findMany({
          where,

          skip,

          take: limit,

          include: {
            client: true,

            events: true,
          },

          orderBy: {
            [sortBy ??
              'createdAt']:
              order ?? 'desc',
          },
        }),

        this.prisma.booking.count({
          where,
        }),
      ]);

    return {
      items,

      meta:
        buildPaginationMeta(
          page,
          limit,
          total,
        ),
    };
  }

    //////////////////////////////////////////////////////
  // GET BOOKING BY ID
  //////////////////////////////////////////////////////

  async findOne(id: string) {
    const booking = await this.prisma.booking.findFirst({
      where: {
        id,
        deletedAt: null,
      },

      include: {
        client: true,

        events: {
          orderBy: {
            startDate: 'asc',
          },
        },

        invoices: true,

        payments: true,
      },
    });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    return booking;
  }

  //////////////////////////////////////////////////////
  // UPDATE BOOKING
  //////////////////////////////////////////////////////

  async update(
    id: string,
    dto: UpdateBookingDto,
  ) {
    const booking =
      await this.prisma.booking.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    const quotationAmount =
      dto.quotationAmount !== undefined
        ? Number(dto.quotationAmount)
        : Number(booking.quotationAmount);

    const advanceAmount =
      dto.advanceAmount !== undefined
        ? Number(dto.advanceAmount)
        : Number(booking.advanceAmount);

    if (advanceAmount > quotationAmount) {
      throw new BadRequestException(
        'Advance amount cannot exceed quotation amount.',
      );
    }

    const remainingAmount =
      quotationAmount - advanceAmount;

    return this.prisma.$transaction(
      async (tx) => {
        const updatedBooking =
          await tx.booking.update({
            where: {
              id,
            },

            data: {
              clientId:
                dto.clientId ??
                booking.clientId,

              title:
                dto.title ??
                booking.title,

              description:
                dto.description ??
                booking.description,

              quotationAmount,

              advanceAmount,

              remainingAmount,

              services:
  dto.services !== undefined
    ? dto.services
    : (booking.services as Prisma.InputJsonValue),

              status:
                dto.status ??
                booking.status,
            },
          });

        if (dto.events) {
          await tx.event.deleteMany({
            where: {
              bookingId: id,
            },
          });

          for (const event of dto.events) {
            await tx.event.create({
              data: {
                bookingId: id,

                title: event.title,

                eventType:
                  event.eventType,

                startDate:
                  new Date(
                    event.startDate,
                  ),

                endDate:
                  event.endDate
                    ? new Date(
                        event.endDate,
                      )
                    : null,

                venue:
                  event.venue,

                city:
                  event.city,

                state:
                  event.state,
              },
            });
          }
        }

        return tx.booking.findUnique({
          where: {
            id,
          },

          include: {
            client: true,

            events: true,
          },
        });
      },
    );
  }

  //////////////////////////////////////////////////////
  // DELETE BOOKING
  //////////////////////////////////////////////////////

  async remove(id: string) {
    const booking =
      await this.prisma.booking.findFirst({
        where: {
          id,
          deletedAt: null,
        },
      });

    if (!booking) {
      throw new NotFoundException(
        'Booking not found',
      );
    }

    return this.prisma.booking.update({
      where: {
        id,
      },

      data: {
        deletedAt: new Date(),
      },
    });
  }
}