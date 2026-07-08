import {
  BadRequestException,
  Injectable,
} from '@nestjs/common';

import * as bcrypt from 'bcrypt';

import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async create(data: {
    fullName: string;
    email: string;
    passwordHash: string;
  }) {
    return this.prisma.user.create({
      data: {
        ...data,
        role: 'ADMIN',
      },
    });
  }


async findAll() {
  return this.prisma.user.findMany({
    where: {
      deletedAt: null,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
}

async createStaff(dto: CreateUserDto) {
  const existingUser = await this.findByEmail(dto.email);

  if (existingUser) {
    throw new BadRequestException(
      'Email already exists',
    );
  }

  const passwordHash = await bcrypt.hash(
    dto.password,
    10,
  );

  return this.prisma.user.create({
    data: {
      fullName: dto.fullName,
      email: dto.email,
      phone: dto.phone,
      passwordHash,
      role: dto.role,
    },
    select: {
      id: true,
      fullName: true,
      email: true,
      phone: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
}
}