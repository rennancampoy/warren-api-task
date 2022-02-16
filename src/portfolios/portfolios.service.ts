import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { CustomerDocument } from './../models/customer.model';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  getDetails = async (customerId: string, portfolioId: string) => {
    const portfolios = (
      await this.customerModel.findOne(new Types.ObjectId(customerId))
    ).portfolios;

    return portfolios.id(portfolioId);
  };
}
