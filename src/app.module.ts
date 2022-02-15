import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import * as config from './config';
import validationSchema from './config/validation/env.schema';
import { PortfoliosModule } from './portfolios/portfolios.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: Object.values(config),
      validationSchema,
    }),
    MongooseModule.forRootAsync({
      useFactory: (configService: ConfigService) => ({
        uri: configService.get('db.uri'),
      }),
      inject: [ConfigService],
    }),
    PortfoliosModule,
  ],
})
export class AppModule {}
