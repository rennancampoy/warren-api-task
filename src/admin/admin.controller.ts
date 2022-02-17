import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PortfoliosService } from 'src/portfolios/portfolios.service';
import { TransactionsService } from 'src/transactions/transactions.service';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(
    private transactionsService: TransactionsService,
    private portfolioService: PortfoliosService,
    private adminService: AdminService,
  ) {}

  @ApiOperation({
    summary:
      'Returns a list of customers sortered by highest allocated amount based on they portfolio',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('topAllocationAmount')
  topAllocationAmount(@Query('page') page, @Query('pageSize') limit) {
    return this.adminService.topAllocationAmount(page, limit);
  }

  @ApiOperation({
    summary: 'Returns a list of customers sortered by highest withdraw amount',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('topCashChurn')
  topCashChurn(
    @Query('page') page,
    @Query('pageSize') limit,
    @Query('start') startDate,
    @Query('end') endDate,
  ) {
    return this.adminService.topCashChurn(page, limit, startDate, endDate);
  }
}