import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

import { UploadMediaDto } from './dto/upload-media.dto';
import { GetMediaDto } from './dto/get-media.dto';

import { UpdateMediaDto } from './dto/update-media.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class MediaService {
  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async upload(
    file: Express.Multer.File,
    userId: string,
    dto: UploadMediaDto,
  ) {
    const album = await this.prisma.album.findUnique({
  where: {
    id: dto.albumId,
  },
});

if (!album) {
  throw new NotFoundException(
    'Album not found',
  );
}

if (album.eventId !== dto.eventId) {
  throw new BadRequestException(
    'Album does not belong to this event',
  );
}
    return this.prisma.media.create({
      data: {
        filename: file.filename,
        originalName: file.originalname,
        mimeType: file.mimetype,
        path: file.path,
        size: file.size,

        type: dto.type,

        uploadedById: userId,

        eventId: dto.eventId,
        albumId: dto.albumId,
      },
    });
  }

  async findAll(dto: GetMediaDto) {
  const {
    page,
    limit,
    eventId,
    albumId,
    sectionId,
    type,
    status,
    search,
  } = dto;

  const where: any = {};

  if (eventId) {
    where.eventId = eventId;
  }

  if (albumId) {
    where.albumId = albumId;
  }

  if (sectionId) {
    where.sectionId = sectionId;
  }

  if (type) {
    where.type = type;
  }

  if (status) {
    where.status = status;
  }

  if (search) {
    where.OR = [
      {
        filename: {
          contains: search,
          mode: 'insensitive',
        },
      },
      {
        originalName: {
          contains: search,
          mode: 'insensitive',
        },
      },
    ];
  }

  const [items, total] = await this.prisma.$transaction([
    this.prisma.media.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: {
        createdAt: 'desc',
      },
      include: {
        uploadedBy: {
          select: {
            id: true,
            fullName: true,
          },
        },
        event: {
          select: {
            id: true,
            eventType: true,
          },
        },
       album: {
  select: {
    id: true,
    title: true,
  },
},

section: {
  select: {
    id: true,
    title: true,
  },
},
      },
    }),

    this.prisma.media.count({
      where,
    }),
  ]);

  return {
    items,
    pagination: {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    },
  };
}
async update(
  id: string,
  dto: UpdateMediaDto,
) {
  const media = await this.prisma.media.findUnique({
    where: {
      id,
    },
  });

  if (!media) {
    throw new NotFoundException(
      'Media not found',
    );
  }

  if (dto.sectionId) {
  const section = await this.prisma.section.findUnique({
    where: {
      id: dto.sectionId,
    },
  });

  if (!section) {
    throw new NotFoundException(
      'Section not found',
    );
  }

  if (section.albumId !== media.albumId) {
    throw new BadRequestException(
      'Section does not belong to the same album',
    );
  }
}
  return this.prisma.media.update({
    where: {
      id,
    },
    data: {
      sectionId: dto.sectionId,
      status: dto.status,
    },
    include: {
      uploadedBy: {
        select: {
          id: true,
          fullName: true,
        },
      },
      event: {
        select: {
          id: true,
          eventType: true,
        },
      },
      album: {
        select: {
          id: true,
          title: true,
        },
      },
      section: {
        select: {
          id: true,
          title: true,
        },
      },
    },
  });
}

async remove(id: string) {
  const media = await this.prisma.media.findUnique({
    where: {
      id,
    },
  });

  if (!media) {
    throw new NotFoundException(
      'Media not found',
    );
  }

  const filePath = path.join(
    process.cwd(),
    media.path,
  );

  if (fs.existsSync(filePath)) {
    fs.unlinkSync(filePath);
  }

  await this.prisma.media.delete({
    where: {
      id,
    },
  });

  return {
    message: 'Media deleted successfully',
  };
}
}