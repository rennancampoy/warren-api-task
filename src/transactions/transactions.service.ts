import { CustomerDocument } from 'src/models/customer.model';
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
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
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

  deposit = async (customerId: string, amount: number) => {
    await this.customerModel.updateOne(
      { _id: customerId },
      { $inc: { balance: amount } },
    );

    await new this.transactionModel({
      _customer: new Types.ObjectId(customerId),
      type: 'deposit',
      status: 'accepted',
      amount,
    }).save();

    return await this.customerModel.findById(customerId);
  };

  accountTransfer = async (
    fromCustomerId: string,
    toCustomerId: string,
    amount: number,
  ) => {
    await this.customerModel.updateOne(
      { _id: fromCustomerId },
      { $inc: { balance: -amount } },
    );

    await this.customerModel.updateOne(
      { _id: toCustomerId },
      { $inc: { balance: amount } },
    );

    await new this.transactionModel({
      _customer: new Types.ObjectId(fromCustomerId),
      toCustomer: new Types.ObjectId(toCustomerId),
      type: 'account_transfer',
      status: 'accepted',
      amount,
    }).save();

    return {
      from: await this.customerModel.findById(fromCustomerId),
      to: await this.customerModel.findById(toCustomerId),
    };
  };
}
