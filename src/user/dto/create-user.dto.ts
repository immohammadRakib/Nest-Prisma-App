import { IsEmail, IsNotEmpty, IsString, IsOptional, IsEnum, MinLength, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
import { Role } from '@prisma/client';

class UserAddressDto {
  @IsString()
  @IsNotEmpty({ message: 'Address Line 1 is required' })
  addressLine1!: string;

  @IsString()
  @IsOptional()
  addressLine2?: string;

  @IsString()
  @IsNotEmpty({ message: 'City is required' })
  city!: string;

  @IsString()
  @IsOptional()
  state?: string;

  @IsString()
  @IsNotEmpty({ message: 'Postal code is required' })
  postalCode!: string;

  @IsString()
  @IsOptional()
  country?: string;
}

export class CreateUserDto {
  @IsEmail({}, { message: 'Please provide a valid email' })
  email!: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  name!: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters' })
  password!: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsNotEmpty({ message: 'Address details are required during signup' })
  @ValidateNested()
  @Type(() => UserAddressDto)
  address!: UserAddressDto; 
}
