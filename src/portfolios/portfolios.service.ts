import { Injectable } from '@nestjs/common';

@Injectable()
export class PortfoliosService {
  getDetails = (id: string) => id;
}