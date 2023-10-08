import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';
export class CreatePurchaseDto {
  @ApiProperty({
    example: 1,
    description: 'customer id',
  })
  @IsNotEmpty()
  customer_id: number;
  @ApiProperty({
    example: 1,
    description: 'product id',
  })
  @IsNotEmpty()
  product_id: number;
  @ApiProperty({
    example: 3,
    description: 'interest Rate',
  })
  @IsNotEmpty()
  interestRate: number;
  @ApiProperty({
    example: 3,
    description: 'installment duration',
  })
  @IsNotEmpty()
  installmentDuration: number;
  @ApiProperty({
    example: 1,
    description: 'admin id',
  })
  @IsNotEmpty()
  admin_id: number;
}
