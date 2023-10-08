import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsPhoneNumber,
  IsEmail,
  IsDate,
} from 'class-validator';
export class CreateCustomerDto {
  @ApiProperty({
    example: 'farik',
    description: 'first name',
  })
  @IsString()
  @IsNotEmpty()
  first_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'last name',
  })
  @IsString()
  @IsNotEmpty()
  last_name: string;
  @ApiProperty({
    example: 'farik',
    description: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    example: '99890*****23',
    description: 'phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
  @ApiProperty({
    example: '2000.12.05',
    description: 'birth date',
  })
  @IsNotEmpty()
  birth_date: Date;
  @ApiProperty({
    example: '<EMAIL>',
    description: 'email',
  })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;
  @ApiProperty({
    example: 'Dd3526352++',
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @ApiProperty({
    example: 'adress',
    description: 'address',
  })
  @IsString()
  @IsNotEmpty()
  address: string;
}
