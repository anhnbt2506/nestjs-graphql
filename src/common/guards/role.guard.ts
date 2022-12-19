import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from 'src/shared/enum';
import { getRequestByContext } from 'src/shared/utils';
import { ROLES_KEY } from '../decorators/role.decorator';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!requiredRoles) {
      return true;
    }
    const request = getRequestByContext(context);
    console.log('request', request.role);
    // const { user } = context.switchToHttp().getRequest();
    // console.log('user', user);
    // return requiredRoles.some((role) => user.role?.includes(role));
    return true;
  }
}
