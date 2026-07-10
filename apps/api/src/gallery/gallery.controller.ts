import {
  Controller,
  Get,
  Param,
} from '@nestjs/common';

import {
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { GalleryService } from './gallery.service';

@ApiTags('Gallery')
@Controller('gallery')
export class GalleryController {
  constructor(
    private readonly galleryService: GalleryService,
  ) {}

  @Get(':galleryToken')
  @ApiOperation({
    summary: 'Get public gallery',
  })
  getGallery(
    @Param('galleryToken')
    galleryToken: string,
  ) {
    return this.galleryService.getGallery(
      galleryToken,
    );
  }
}