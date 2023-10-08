import {
  IsString,
  IsNotEmpty,
  IsStrongPassword,
  IsPhoneNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateAdminDto {
  @ApiProperty({
    example: 'farik',
    description: 'username',
  })
  @IsString()
  @IsNotEmpty()
  username: string;
  @ApiProperty({
    example: 'ssss5555',
    description: 'password',
  })
  @IsString()
  @IsNotEmpty()
  @IsStrongPassword()
  password: string;
  @ApiProperty({
    example: '99890*****23',
    description: 'phone number',
  })
  @IsString()
  @IsNotEmpty()
  @IsPhoneNumber('UZ')
  phone_number: string;
}
