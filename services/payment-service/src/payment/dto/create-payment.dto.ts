import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
} from 'class-validator';

export class CreatePaymentDto {
  @IsInt()
  @Min(1)
  orderId: number;

  @IsNotEmpty()
  @IsString()
  paymentMethod: string;

  @IsNumber()
  @Min(0.01)
  amount: number;
}
