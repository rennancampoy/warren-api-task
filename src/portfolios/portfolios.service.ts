import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from 'src/models/customer.model';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel('Customer')
    private readonly customerModel: Model<CustomerDocument>,
  ) {}

  portfoliosFromCustomer = async (customerId: string) =>
    (await this.customerModel.findById(customerId)).portfolios;

  getDetails = async (customerId: string, portfolioId: string) =>
    (await this.portfoliosFromCustomer(customerId)).id(portfolioId);

  goalReached = async (customerId: string) =>
    (await this.portfoliosFromCustomer(customerId)).filter(
      (p) => p.amount >= p.goalAmount,
    );
}
