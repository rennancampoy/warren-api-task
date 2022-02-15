import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CustomerId = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) =>
    ctx.switchToHttp().getRequest().headers['customer-id'],
);
