import {
  DepositDto,
  AccountTransferDto,
  PortfolioTransferDto,
} from './dto/transactions.dto';
import { Portfolio } from '../portfolios/portfolio.model';
import { PortfoliosService } from './../portfolios/portfolios.service';
import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { CustomerId } from './../decorators/customer-id.decorator';
import { TransactionsService } from './transactions.service';
import { Types } from 'mongoose';
import { CustomerDocument } from 'src/portfolios/customer.model';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(
    private transactionsService: TransactionsService,
    private portfolioService: PortfoliosService,
  ) {}

  @ApiOperation({
    summary:
      'Returns a list of deposit transactions of a stated status between a initial and end date',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiQuery({ name: 'status' })
  @ApiQuery({ name: 'start' })
  @ApiQuery({ name: 'end' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('deposits')
  deposits(
    @CustomerId() customerId,
    @Query('status') status,
    @Query('start') startDate,
    @Query('end') endDate,
  ) {
    return this.transactionsService.deposits(
      customerId,
      status,
      startDate,
      endDate,
    );
  }

  @ApiOperation({
    summary: 'Deposit a value on the customer account',
  })
  @ApiOkResponse({
    description: 'Response with success',
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('deposit')
  deposit(
    @CustomerId() customerId,
    @Body() { amount }: DepositDto,
  ): Promise<CustomerDocument> {
    return this.transactionsService.deposit(customerId, amount);
  }

  @ApiOperation({
    summary: 'Transfer a value from the customer to another customer account',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('account-transfer/:id')
  accountTransfer(
    @CustomerId() fromCustomerId,
    @Param('id') toCustomerId,
    @Body() { amount }: AccountTransferDto,
  ) {
    return this.transactionsService.accountTransfer(
      fromCustomerId,
      toCustomerId,
      amount,
    );
  }

  @ApiOperation({
    summary: 'Transfer a value from a portfolio to another',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiQuery({ name: 'fromPortfolio' })
  @ApiQuery({ name: 'toPortfolio' })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('portfolio-transfer')
  async portfolioTransfer(
    @CustomerId() customerId,
    @Query('fromPortfolio') fromPortfolio,
    @Query('toPortfolio') toPortfolio,
    @Body() { amount }: PortfolioTransferDto,
  ) {
    const fromPortfolioDetails:
      | (Types.Subdocument<Types.ObjectId> & Portfolio)
      | undefined = await this.portfolioService.getDetails(
      customerId,
      fromPortfolio,
    );

    if (!fromPortfolioDetails) return { error: 'invalid customer id' };

    if (fromPortfolioDetails.amount - amount < 0)
      return { error: 'Insufficient portfolio balance' };

    const toPortfolioDetails = await this.portfolioService.getDetails(
      customerId,
      toPortfolio,
    );

    return this.transactionsService.portfolioTransfer(
      customerId,
      fromPortfolioDetails,
      toPortfolioDetails,
      amount,
    );
  }
}
