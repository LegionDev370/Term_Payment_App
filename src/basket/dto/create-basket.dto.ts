import { IsNumber, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateBasketDto {
  @ApiProperty({
    example: 1,
    description: 'customer id',
  })
  @IsNotEmpty()
  @IsNumber()
  customer_id: number;
  @ApiProperty({
    example: 1,
    description: 'product id',
  })
  @IsNotEmpty()
  @IsNumber()
  product_id: number;
}
