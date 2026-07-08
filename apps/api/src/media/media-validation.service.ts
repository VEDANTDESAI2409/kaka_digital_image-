import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediaValidationService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async validateAlbumBelongsToEvent(
    albumId: string,
    eventId: string,
  ) {
    const album = await this.prisma.album.findUnique({
      where: {
        id: albumId,
      },
    });

    if (!album) {
      throw new NotFoundException(
        'Album not found',
      );
    }

    if (album.eventId !== eventId) {
      throw new BadRequestException(
        'Album does not belong to this event',
      );
    }

    return album;
  }

  async validateSectionBelongsToAlbum(
    sectionId: string,
    albumId: string,
  ) {
    const section = await this.prisma.section.findUnique({
      where: {
        id: sectionId,
      },
    });

    if (!section) {
      throw new NotFoundException(
        'Section not found',
      );
    }

    if (section.albumId !== albumId) {
      throw new BadRequestException(
        'Section does not belong to this album',
      );
    }

    return section;
  }
}