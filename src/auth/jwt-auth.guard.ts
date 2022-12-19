import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { GqlExecutionContext } from '@nestjs/graphql';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }
  getRequest(context: ExecutionContext) {
    console.log('2');
    const ctx = GqlExecutionContext.create(context);
    const request = ctx.getContext().req;
    const roles = this.reflector.get<string[]>('roles', ctx.getHandler());
    console.log('roles', roles);
    console.log('request role', context.getHandler());
    return request;
  }
}
