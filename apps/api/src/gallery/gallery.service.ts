import {
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { MediaStatus } from '@prisma/client';

import { PrismaService } from '../prisma/prisma.service';
import { GalleryMapper } from './mapper/gallery.mapper';

@Injectable()
export class GalleryService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getGallery(
    galleryToken: string,
  ) {
    const event =
      await this.prisma.event.findUnique({
        where: {
          galleryToken,
        },
        include: {
          booking: {
            include: {
              client: true,
            },
          },

          albums: {
            where: {
              deletedAt: null,
            },

            orderBy: {
              sortOrder: 'asc',
            },

            include: {
              sections: {
                where: {
                  deletedAt: null,
                },

                orderBy: {
                  sortOrder: 'asc',
                },

                include: {
                  media: {
                    where: {
                        status: MediaStatus.APPROVED,
                    },

                    orderBy: {
                      createdAt: 'asc',
                    },
                  },
                },
              },
            },
          },
        },
      });

    if (!event) {
      throw new NotFoundException(
        'Gallery not found',
      );
    }

    return GalleryMapper.toResponse(event);
  }
}