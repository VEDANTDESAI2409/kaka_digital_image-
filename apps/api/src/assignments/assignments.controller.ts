import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';

import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AssignmentsService } from './assignments.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Controller('events/:eventId/assignments')
@UseGuards(JwtAuthGuard)
export class AssignmentsController {
  constructor(
    private readonly assignmentsService: AssignmentsService,
  ) {}

  @Post()
  assign(
    @Param('eventId') eventId: string,
    @Body() dto: CreateAssignmentDto,
  ) {
    return this.assignmentsService.assign(eventId, dto);
  }

  @Get()
  findByEvent(
    @Param('eventId') eventId: string,
  ) {
    return this.assignmentsService.findByEvent(eventId);
  }
}