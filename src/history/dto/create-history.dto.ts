import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateHistoryDto {
  @ApiProperty({
    example: 'credit card',
    description: 'payment method',
  })
  @IsNotEmpty()
  @IsString()
  payment_method: string;
  @ApiProperty({
    example: 100,
    description: 'amount',
  })
  @IsNotEmpty()
  amount: number;
  @ApiProperty({
    example: 1,
    description: 'purchases id',
  })
  @IsNotEmpty()
  purchases_id: number;
}
