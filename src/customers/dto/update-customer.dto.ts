import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsStrongPassword,
  IsPhoneNumber,
  IsEmail,
} from 'class-validator';
export class UpdateCustomerDto {
  @ApiProperty({
    example: 'farik',
    description: 'first name',
  })
  @IsOptional()
  @IsString()
  first_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'last name',
  })
  @IsOptional()
  @IsString()
  last_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'username',
  })
  @IsOptional()
  @IsString()
  username: string;
  @ApiProperty({
    example: '99890*****23',
    description: 'phone number',
  })
  @IsOptional()
  @IsString()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @ApiProperty({
    example: '2000.12.05',
    description: 'birth date',
  })
  @IsOptional()
  @IsString()
  birth_date: Date;
  @ApiProperty({
    example: '<EMAIL>',
    description: 'email',
  })
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'Dd3526352++',
    description: 'password',
  })
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  password: string;
  @ApiProperty({
    example: 'adress',
    description: 'address',
  })
  @IsOptional()
  @IsString()
  address: string;
  @ApiProperty({
    example: 'Ab2526352',
    description: 'passport info',
  })
  @IsOptional()
  @IsString()
  passport_info: string;
}
