import type { ExecutionContext } from '@nestjs/common';
import { GqlExecutionContext } from '@nestjs/graphql';
import * as bcrypt from 'bcrypt';

export const comparePasswords = async (userPassword, currentPassword) => {
  return await bcrypt.compare(currentPassword, userPassword);
};

export const hashString = (string: string, saltRounds = 5) => {
  const salt = bcrypt.genSaltSync(saltRounds);
  return bcrypt.hashSync(string, salt);
};

export function getRequestByContext(context: ExecutionContext) {
  const ctx = GqlExecutionContext.create(context);
  let request;

  switch (context.getType() as string) {
    case 'http':
      request = context.switchToHttp().getRequest();
      break;
    case 'graphql':
      request = ctx.getContext().req;
      break;
  }

  return request;
}
