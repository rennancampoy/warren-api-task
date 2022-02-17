import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class DepositDto {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}

export class AccountTransferDto {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}

export class PortfolioTransferDto {
  @ApiProperty()
  @IsNotEmpty()
  amount: number;
}

export class DepositsListResponseDto {}
