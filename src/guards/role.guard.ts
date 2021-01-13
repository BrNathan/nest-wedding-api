import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from 'src/decorator/roles.decorator';
import { JwtPayload } from 'src/interfaces/jwt-payload.interface';
import { Role } from 'src/keys';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredGroups = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    console.log('requiredGroups', requiredGroups);
    if (!requiredGroups) {
      return true;
    }
    const user = context.switchToHttp().getRequest().user as JwtPayload;
    return requiredGroups.some((role) => role === user?.userGroup);
  }
}
