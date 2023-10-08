import {
  IsOptional,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class UpdateAdminDto {
  @ApiProperty({
    example: 'farik',
    description: 'username',
  })
  @IsString()
  @IsOptional()
  username: string;
  @ApiProperty({
    example: 'ssss5555',
    description: 'password',
  })
  @IsString()
  @IsOptional()
  @IsStrongPassword()
  password: string;
  @ApiProperty({
    example: '99890*****23',
    description: 'phone number',
  })
  @IsString()
  @IsOptional()
  phone_number: string;
  @ApiProperty({
    example: '<IsActive>',
    description: 'is_active',
  })
  @IsString()
  @IsOptional()
  hashed_refresh_token: string;
}
