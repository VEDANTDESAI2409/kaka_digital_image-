import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto } from './dto/create-assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private readonly prisma: PrismaService) {}

  async assign(eventId: string, dto: CreateAssignmentDto) {
    const event = await this.prisma.event.findUnique({
      where: {
        id: eventId,
      },
    });

    if (!event) {
      throw new NotFoundException('Event not found');
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: dto.userId,
      },
    });

    if (!user) {
      throw new NotFoundException('User not found');
    }

    const existing = await this.prisma.eventAssignment.findFirst({
      where: {
        eventId,
        userId: dto.userId,
        role: dto.role,
      },
    });

    if (existing) {
      throw new ConflictException(
        'User is already assigned with this role.',
      );
    }

    return this.prisma.eventAssignment.create({
      data: {
        eventId,
        userId: dto.userId,
        role: dto.role,
        notes: dto.notes,
      },
    });
  }

  async findByEvent(eventId: string) {
    return this.prisma.eventAssignment.findMany({
      where: {
        eventId,
      },
      include: {
        user: true,
      },
      orderBy: {
        assignedAt: 'asc',
      },
    });
  }
}