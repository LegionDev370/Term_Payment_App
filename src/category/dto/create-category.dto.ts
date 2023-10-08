import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreateCategoryDto {
  @ApiProperty({
    example: 'phones',
    description: 'phone name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;
}
