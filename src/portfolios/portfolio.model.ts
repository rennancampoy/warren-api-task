import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Portfolio {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, default: 0 })
  amount: number;

  @Prop({ required: true })
  goalAmount: number;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ default: Date.now() })
  updatedAt: Date;

  @Prop({ default: false })
  isDeleted: boolean;

  @Prop()
  deletedAt: Date;
}

export const portfolioSchema = SchemaFactory.createForClass(Portfolio);

export type PortfolioDocument = Portfolio & Document;
