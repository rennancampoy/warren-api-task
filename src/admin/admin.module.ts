import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { customerSchema } from 'src/portfolios/customer.model';
import { AdminController } from './admin.controller';
import { PortfoliosService } from '../portfolios/portfolios.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { transactionSchema } from 'src/transactions/transaction.model';
import { AdminService } from './admin.service';

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
  providers: [TransactionsService, PortfoliosService, AdminService],
  controllers: [AdminController],
})
export class AdminModule {}
