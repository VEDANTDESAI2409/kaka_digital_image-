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
  async upload(
    @UploadedFile() file: Express.Multer.File,
    @Body() dto: UploadMediaDto,
    @Req() req: any,
  ) {
    return this.mediaService.upload(
      file,
      req.user.id,
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