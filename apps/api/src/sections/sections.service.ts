import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateSectionDto } from './dto/create-section.dto';

@Injectable()
export class SectionsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateSectionDto) {
    return this.prisma.section.create({
      data: {
        albumId: dto.albumId,
        title: dto.title,
        type: dto.type,
        description: dto.description,
        sortOrder: dto.sortOrder ?? 0,
      },
    });
  }

  async findAll() {
    return this.prisma.section.findMany({
      include: {
        album: true,
      },
      orderBy: {
        sortOrder: 'asc',
      },
    });
  }
}