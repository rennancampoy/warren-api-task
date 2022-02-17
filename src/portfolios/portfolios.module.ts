import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { customerSchema } from 'src/models/customer.model';
import { PortfoliosController } from './portfolios.controller';
import { PortfoliosService } from './portfolios.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Customer',
        schema: customerSchema,
      },
    ]),
  ],
  providers: [PortfoliosService],
  controllers: [PortfoliosController],
})
export class PortfoliosModule {}
