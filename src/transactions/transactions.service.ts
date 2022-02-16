import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { fixDate } from './../utils/date';
import { TransactionDocument } from './../models/transaction.model';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}

  deposits = async (
    customerId: string,
    status: string,
    startDate: Date,
    endDate: Date,
  ) =>
    await this.transactionModel.find({
      _customer: new Types.ObjectId(customerId),
      type: 'deposit',
      status,
      createdAt: {
        $gte: fixDate(startDate),
        $lt: fixDate(endDate),
      },
    });
}
