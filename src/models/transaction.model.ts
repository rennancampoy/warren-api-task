import { Document, Types } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Transaction {
  @Prop({
    type: Types.ObjectId,
    ref: 'Customer',
  })
  _customer: Types.ObjectId;

  @Prop({
    required: true,
    enum: [
      'deposit',
      'withdraw',
      'account_transfer',
      'portfolio_deposit',
      'portfolio_transfer',
      'portfolio_withdraw',
    ],
  })
  type: string;

  @Prop({
    required: true,
    enum: ['pending', 'accepted', 'rejected', 'deleted'],
  })
  status: string;

  @Prop({ required: true, default: 0 })
  amount: number;

  @Prop({
    type: Types.ObjectId,
    ref: 'Portfolio',
  })
  fromPortfolio: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Portfolio',
  })
  toPortfolio: Types.ObjectId;

  @Prop({
    type: Types.ObjectId,
    ref: 'Customer',
  })
  toCustomer: Types.ObjectId;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;
}

export const transactionSchema = SchemaFactory.createForClass(Transaction);

export type TransactionDocument = Transaction & Document;
