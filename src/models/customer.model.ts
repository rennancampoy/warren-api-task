import { Types, Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Portfolio, portfolioSchema } from './portfolio.model';

@Schema()
export class Customer {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true, default: 0 })
  balance: number;

  @Prop([portfolioSchema])
  portfolios: Types.DocumentArray<Portfolio>;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const customerSchema = SchemaFactory.createForClass(Customer);

export type CustomerDocument = Customer & Document;
