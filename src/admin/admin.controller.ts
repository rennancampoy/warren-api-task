import { Controller, Get, Query } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiQuery,
} from '@nestjs/swagger';
import { AdminService } from './admin.service';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private adminService: AdminService) {}

  @ApiOperation({
    summary:
      'Returns a list of customers sortered by highest allocated amount based on they portfolio',
  })
  @ApiOkResponse({
    description: 'Response with success',
    type: '', //TODO: create DTO
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'pageSize' })
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
  @ApiQuery({ name: 'page' })
  @ApiQuery({ name: 'pageSize' })
  @ApiQuery({ name: 'start' })
  @ApiQuery({ name: 'end' })
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
