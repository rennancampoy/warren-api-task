import { CustomerId } from './../decorators/customer-id.decorator';
import { Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { PortfoliosService } from './portfolios.service';

@ApiTags('Portfolios')
@Controller('portfolios')
export class PortfoliosController {
  constructor(private portfoliosService: PortfoliosService) {}

  @ApiOperation({ summary: 'Returns the portfolio details from a given id' })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  getPortfolioDetails(
    @CustomerId() customerId,
    @Param('id') portfolioId: string,
  ) {
    return this.portfoliosService.getDetails(customerId, portfolioId);
  }
}
