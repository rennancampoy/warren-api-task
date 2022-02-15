import { Controller, Get, Param } from '@nestjs/common';
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
  getPortfolioDetails(@Param('id') id: string) {
    return this.portfoliosService.getDetails(id);
  }
}
