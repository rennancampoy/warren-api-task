import { paginate, paginatedArray } from './../utils/pagination';
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { TransactionDocument } from '../transactions/transaction.model';
import { CustomerDocument } from 'src/portfolios/customer.model';
import { fixDate } from 'src/utils/date';

@Injectable()
export class AdminService {
  constructor(
    @InjectModel('Transaction')
    private readonly transactionModel: Model<TransactionDocument>,
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  topAllocationAmount = async (page: number, limit: number) => {
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

  topCashChurn = async (
    page: number,
    limit: number,
    startDate: Date,
    endDate: Date,
  ) => {
    const results: any = this.transactionModel.aggregate([
      {
        $match: {
          type: 'withdraw',
          createdAt: {
            $gte: fixDate(startDate, true),
            $lt: fixDate(endDate, true),
          },
        },
      },
      {
        $group: {
          _id: '$_customer',
          totalAmount: { $sum: '$amount' },
        },
      },
    ]);

    const sorteredCustomers = (await results).sort(
      (a: any, b: any) => b.totalAmount - a.totalAmount,
    );

    const sorteredWithNames = await Promise.all(
      sorteredCustomers.map(async (c) => {
        const { firstName, lastName } = await this.customerModel.findById(
          c._id,
        );
        return { ...c, name: `${firstName} ${lastName}` };
      }),
    );

    return {
      customers: paginatedArray(sorteredWithNames, page, limit),
      pagination: paginate(sorteredWithNames.length, page, limit),
    };
  };
}
