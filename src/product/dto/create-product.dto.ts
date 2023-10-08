import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber } from 'class-validator';
export class CreateProductDto {
  @ApiProperty({
    example: 'cherry',
    description: 'title',
  })
  @IsNotEmpty()
  @IsString()
  title: string;
  @ApiProperty({
    example: 'cherry',
    description: 'description',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
  @ApiProperty({
    example: 'cherry',
    description: 'price',
  })
  @IsNotEmpty()
  price: number;
  @ApiProperty({
    example: 'cherry',
    description: 'count',
  })
  @IsNotEmpty()
  count: number;
  @ApiProperty({
    example: '1',
    description: 'category_id',
  })
  @IsNotEmpty()
  category_id: number;
}
