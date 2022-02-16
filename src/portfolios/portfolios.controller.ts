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

  @ApiOperation({
    summary:
      'Returns a list of portfolios where the amount is greater than the goal',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get('goalReached')
  goalReached(@CustomerId() customerId) {
    return this.portfoliosService.goalReached(customerId);
  }

  @ApiOperation({ summary: 'Returns the portfolio details from a given id' })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Get(':id')
  getDetails(@CustomerId() customerId, @Param('id') portfolioId: string) {
    return this.portfoliosService.getDetails(customerId, portfolioId);
  }
}
