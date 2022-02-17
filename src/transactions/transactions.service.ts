import { Portfolio } from './../models/portfolio.model';
import { CustomerDocument } from 'src/models/customer.model';
import { Model, Types, ObjectId } from 'mongoose';
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
    if (
      (await this.customerModel.findById(fromCustomerId)).balance - amount <
      0
    )
      return { error: 'Insufficient account balance' };

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

  portfolioTransfer = async (
    customerId: string,
    fromPortfolio: Types.Subdocument<Types.ObjectId> & Portfolio,
    toPortfolio: Types.Subdocument<Types.ObjectId> & Portfolio,
    amount: number,
  ) => {
    await this.customerModel.updateOne(
      {
        _id: new Types.ObjectId(customerId),
        'portfolios._id': fromPortfolio.id,
      },
      { $set: { 'portfolios.$.amount': fromPortfolio.amount - amount } },
    );

    await this.customerModel.updateOne(
      {
        _id: new Types.ObjectId(customerId),
        'portfolios._id': toPortfolio.id,
      },
      { $set: { 'portfolios.$.amount': toPortfolio.amount + amount } },
    );

    await new this.transactionModel({
      _customer: new Types.ObjectId(customerId),
      type: 'portfolio_transfer',
      fromPortfolio,
      toPortfolio,
      status: 'accepted',
      amount,
    }).save();

    return await this.customerModel.findById(customerId);
  };
}
