import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';

export const UserJwt = createParamDecorator<any, ExecutionContext, JwtPayload>(
  (data: any, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user as JwtPayload;
  },
);
