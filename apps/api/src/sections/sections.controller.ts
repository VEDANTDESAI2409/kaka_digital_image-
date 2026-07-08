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

import { CreateSectionDto } from './dto/create-section.dto';
import { SectionsService } from './sections.service';

@ApiTags('Sections')
@ApiBearerAuth('JWT')
@Controller('sections')
@AdminOnly()
export class SectionsController {
  constructor(
    private readonly sectionsService: SectionsService,
  ) {}

  @Post()
  @ApiOperation({
    summary: 'Create section',
  })
  create(@Body() dto: CreateSectionDto) {
    return this.sectionsService.create(dto);
  }

  @Get()
  @ApiOperation({
    summary: 'List sections',
  })
  findAll() {
    return this.sectionsService.findAll();
  }
}