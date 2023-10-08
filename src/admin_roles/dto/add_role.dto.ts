import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsNotEmpty } from 'class-validator';
export class AddRoleDto {
  @ApiProperty({
    example: 1,
  })
  @IsNotEmpty()
  @IsNumber()
  role_id: number
  @ApiProperty({
    example: 2,
  })
  @IsNotEmpty()
  @IsNumber()
  admin_id: number;
}
