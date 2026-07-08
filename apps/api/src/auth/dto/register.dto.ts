import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
} from 'class-validator';

export class RegisterDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
  example: 'Vedant Desai',
})
fullName: string;

  @IsEmail()
  @ApiProperty({
  example: 'admin@kakadigitalimage.com',
})
  email: string;

  @IsString()
  @MinLength(8)
  @ApiProperty({
  example: 'StrongPassword123!',
})
password: string;
}