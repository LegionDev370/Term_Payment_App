import { IsOptional } from 'class-validator';
export class UpdatePurchaseDto {
  @IsOptional()
  customer_id: number;
  @IsOptional()
  product_id: number;
  @IsOptional()
  interestRate: number;
  @IsOptional()
  installmentDuration: number;
  @IsOptional()
  admin_id: number;
}
