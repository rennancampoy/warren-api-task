import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CustomerDocument } from 'src/models/customer.model';

@Injectable()
export class PortfoliosService {
  constructor(
    @InjectModel('Customer')
    readonly customerModel: Model<CustomerDocument>,
  ) {}

  portfoliosFromCustomer = async (customerId: string) => {
    const customer = await this.customerModel.findById(customerId);
    if (!customer || (customer && !customer.portfolios)) return undefined;
    return customer.portfolios;
  };

  getDetails = async (customerId: string, portfolioId: string) => {
    const portfolios = await this.portfoliosFromCustomer(customerId);
    if (!portfolios) return undefined;
    return portfolios.id(portfolioId);
  };

  goalReached = async (customerId: string) => {
    const portfolios = await this.portfoliosFromCustomer(customerId);
    if (!portfolios) return undefined;
    return portfolios.filter((p) => p.amount >= p.goalAmount);
  };
}
