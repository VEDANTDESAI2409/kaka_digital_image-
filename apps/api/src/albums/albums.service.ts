import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

import { CreateAlbumDto } from './dto/create-album.dto';

@Injectable()
export class AlbumsService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async create(dto: CreateAlbumDto) {
    return this.prisma.album.create({
      data: dto,
    });
  }

  async findAll() {
    return this.prisma.album.findMany({
      include: {
        event: true,
      },
    });
  }
}