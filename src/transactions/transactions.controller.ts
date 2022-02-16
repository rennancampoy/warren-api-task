import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CustomerId } from 'src/decorators/customer-id.decorator';
import { TransactionsService } from './transactions.service';

@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private transactionsService: TransactionsService) {}

  @ApiOperation({
    summary:
      'Returns a list of deposit transactions of a stated status between a initial and end date',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
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
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('deposit')
  deposit(@CustomerId() customerId, @Body('amount') amount) {
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
    @Body('amount') amount,
  ) {
    return this.transactionsService.accountTransfer(
      fromCustomerId,
      toCustomerId,
      amount,
    );
  }
}
