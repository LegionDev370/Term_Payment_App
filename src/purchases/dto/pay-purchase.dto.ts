import { IsNotEmpty, IsString } from 'class-validator';
export class PayPurchaseDto {
  @IsNotEmpty()
  @IsString()
  payment_method: string;
  @IsNotEmpty()
  amount: number;
  @IsNotEmpty()
  purchase_id: number;
}
