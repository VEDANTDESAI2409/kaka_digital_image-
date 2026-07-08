import { AssignmentRole } from '@prisma/client';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  userId: string;

  @IsEnum(AssignmentRole)
  role: AssignmentRole;

  @IsOptional()
  @IsString()
  notes?: string;
}