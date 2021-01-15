import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserJwtPayload } from 'src/interfaces/jwt-payload.interface';

export const UserJwt = createParamDecorator<
  any,
  ExecutionContext,
  UserJwtPayload
>((data: any, ctx: ExecutionContext) => {
  const request = ctx.switchToHttp().getRequest();
  return request.user as UserJwtPayload;
});
