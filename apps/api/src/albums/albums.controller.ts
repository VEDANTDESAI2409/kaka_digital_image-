import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import {
  ApiBearerAuth,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';

import { AdminOnly } from '../auth/decorators/admin-only.decorator';

import { CreateAlbumDto } from './dto/create-album.dto';
import { AlbumsService } from './albums.service';

@ApiTags('Albums')
@ApiBearerAuth('JWT')
@Controller('albums')
@AdminOnly()
export class AlbumsController {
  constructor(
    private readonly albumsService: AlbumsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create album',
  })
  create(@Body() dto: CreateAlbumDto) {
    return this.albumsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List albums',
  })
  findAll() {
    return this.albumsService.findAll();
  }
}