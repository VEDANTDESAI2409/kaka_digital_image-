
import {
  IsEmail,
  IsOptional,
  IsPhoneNumber,
  IsString,
} from 'class-validator';

export class CreateClientDto {
  @IsString()
  primaryContactName: string;

  @IsString()
  primaryPhone: string;

  @IsOptional()
  @IsString()
  primaryWhatsApp?: string;

  @IsOptional()
  @IsEmail()
  primaryEmail?: string;

  @IsOptional()
  @IsString()
  partnerName?: string;

  @IsOptional()
  @IsString()
  partnerPhone?: string;

  @IsOptional()
  @IsString()
  partnerWhatsApp?: string;

  @IsOptional()
  @IsEmail()
  partnerEmail?: string;

  @IsOptional()
  @IsString()
  address?: string;

  @IsOptional()
  @IsString()
  city?: string;

  @IsOptional()
  @IsString()
  state?: string;

  @IsOptional()
  @IsString()
  pincode?: string;

  @IsOptional()
  @IsString()
  notes?: string;
}