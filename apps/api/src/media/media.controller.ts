import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  Req,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiBody,
  ApiConsumes,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';

import { AdminOnly } from '../auth/decorators/admin-only.decorator';

import { MediaService } from './media.service';
import { UploadMediaDto } from './dto/upload-media.dto';

import { GetMediaDto } from './dto/get-media.dto';
import { UpdateMediaDto } from './dto/update-media.dto';
import { BulkUpdateStatusDto } from './dto/bulk-update-status.dto';
import { BulkUpdateSectionDto } from './dto/bulk-update-section.dto';
import { UploadedFiles } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';

import { BulkUploadMediaDto } from './dto/bulk-upload-media.dto';

@ApiTags('Media')
@ApiBearerAuth('JWT')
@Controller('media')
@AdminOnly()
export class MediaController {
  constructor(
    private readonly mediaService: MediaService,
  ) {}

  @Post('upload')
  @ApiOperation({
    summary: 'Upload media',
  })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        eventId: {
          type: 'string',
        },
        albumId: {
          type: 'string',
        },
        type: {
          type: 'string',
          enum: [
            'PHOTO',
            'VIDEO',
            'HIGHLIGHT_FILM',
            'FULL_MOVIE',
            'ALBUM_PDF',
            'PRINT_FILE',
            'RAW_PHOTO',
            'RAW_VIDEO',
          ],
        },
        file: {
          type: 'string',
          format: 'binary',
        },
      },
      required: [
        'eventId',
        'albumId',
        'type',
        'file',
      ],
    },
  })
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (_, file, cb) => {
          const uniqueName =
            Date.now() +
            '-' +
            Math.round(Math.random() * 1e9);

          cb(
            null,
            uniqueName + extname(file.originalname),
          );
        },
      }),
    }),
  )
  
  
@Post('upload/bulk')
@ApiOperation({
  summary: 'Bulk upload media',
})
@ApiConsumes('multipart/form-data')
@ApiBody({
  schema: {
    type: 'object',
    properties: {
      files: {
        type: 'array',
        items: {
          type: 'string',
          format: 'binary',
        },
      },
      eventId: {
        type: 'string',
      },
      albumId: {
        type: 'string',
      },
      sectionId: {
        type: 'string',
      },
    },
    required: [
      'files',
      'eventId',
      'albumId',
    ],
  },
})
@UseInterceptors(
  FilesInterceptor('files', 500, {
    storage: diskStorage({
      destination: './uploads',
      filename: (_, file, cb) => {
        const uniqueName =
          Date.now() +
          '-' +
          Math.round(Math.random() * 1e9);

        cb(
          null,
          uniqueName + extname(file.originalname),
        );
      },
    }),
  }),
)
bulkUpload(
  @UploadedFiles() files: Express.Multer.File[],
  @Req() req: any,
  @Body() dto: BulkUploadMediaDto,
) {
  return this.mediaService.bulkUpload(
    files,
    req.user.sub,
    dto,
  );
}

  @Get()
@ApiOperation({
  summary: 'List media',
})
findAll(
  @Query() dto: GetMediaDto,
) {
  return this.mediaService.findAll(dto);
}
@Patch('bulk/status')
@ApiOperation({
  summary: 'Bulk update media status',
})
bulkUpdateStatus(
  @Body() dto: BulkUpdateStatusDto,
) {
  return this.mediaService.bulkUpdateStatus(dto);
}

@Patch('bulk/section')
@ApiOperation({
  summary: 'Bulk move media to section',
})
bulkUpdateSection(
  @Body() dto: BulkUpdateSectionDto,
) {
  return this.mediaService.bulkUpdateSection(dto);
}

@Patch(':id')
@ApiOperation({
  summary: 'Update media',
})
update(
  @Param('id') id: string,
  @Body() dto: UpdateMediaDto,
) {
  return this.mediaService.update(id, dto);
}

@Delete(':id')
@ApiOperation({
  summary: 'Delete media',
})
remove(
  @Param('id') id: string,
) {
  return this.mediaService.remove(id);
}

}