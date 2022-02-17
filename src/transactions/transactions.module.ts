import { PortfoliosService } from './../portfolios/portfolios.service';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { transactionSchema } from './transaction.model';
import { customerSchema } from '../portfolios/customer.model';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Transaction',
        schema: transactionSchema,
      },
      {
        name: 'Customer',
        schema: customerSchema,
      },
    ]),
  ],
  providers: [TransactionsService, PortfoliosService],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
