import { Prisma } from '@prisma/client';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateClientDto } from './dto/create-client.dto';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { ClientQueryDto } from './dto/client-query.dto';
import { buildPaginationMeta } from '../common/utils/pagination.util';
import { UpdateClientDto } from './dto/update-client.dto';


@Injectable()
export class ClientsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateClientDto) {
    return this.prisma.client.create({
      data: dto,
    });
  }

 async findAll(query: ClientQueryDto) {
  const {
    page,
    limit,
    search,
    city,
    state,
    sortBy,
    order,
  } = query;

  const skip = (page - 1) * limit;

  const where: Prisma.ClientWhereInput = {};

  where.deletedAt = null;

if (search) {
  where.OR = [
    {
      primaryContactName: {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      },
    },
    {
      primaryEmail: {
        contains: search,
        mode: Prisma.QueryMode.insensitive,
      },
    },
    {
      primaryPhone: {
        contains: search,
      },
    },
  ];
}

if (city) {
  where.city = city;
}

if (state) {
  where.state = state;
}
  const [items, total] = await this.prisma.$transaction([
    this.prisma.client.findMany({
      where,
      skip,
      take: limit,
      orderBy: {
        [sortBy ?? 'createdAt']: order ?? 'desc',
      },
    }),

    this.prisma.client.count({
      where,
    }),
  ]);

  return {
    items,
   meta: buildPaginationMeta(
  page,
  limit,
  total,
),
  };
}

async findOne(id: string) {
  return this.prisma.client.findFirst({
    where: {
      id,
      deletedAt: null,
    },
  });
}

async update(
  id: string,
  dto: UpdateClientDto,
) {
  return this.prisma.client.update({
    where: {
      id,
    },
    data: dto,
  });
}

async remove(id: string) {
  return this.prisma.client.update({
    where: {
      id,
    },
    data: {
      deletedAt: new Date(),
    },
  });
}

}