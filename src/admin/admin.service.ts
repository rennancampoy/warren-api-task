import { paginate, paginatedArray } from './../utils/pagination';
import { Model, Types } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from '../models/transaction.model';
import { CustomerDocument } from 'src/models/customer.model';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  topAllocationAmount = async ({ page, limit }) => {
    const results = this.customerModel.aggregate<CustomerDocument>([
      {
        $addFields: {
          totalAmount: {
            $sum: '$portfolios.amount',
          },
        },
      },
    ]);

    const sorteredCustomers = (await results).sort(
      (a: any, b: any) => b.totalAmount - a.totalAmount,
    );

    return {
      customers: paginatedArray(sorteredCustomers, page, limit),
      pagination: paginate(sorteredCustomers.length, page, limit),
    };
  };

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
}
