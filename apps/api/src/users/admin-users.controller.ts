import {
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';

import { AdminOnly } from '../auth/decorators/admin-only.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';

@Controller('admin/users')
@AdminOnly()
export class AdminUsersController {
  constructor(
    private readonly usersService: UsersService,
  ) {}

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.usersService.createStaff(dto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }
}