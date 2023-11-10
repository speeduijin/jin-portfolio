import {
  ExecutionContext,
  InternalServerErrorException,
  createParamDecorator,
} from '@nestjs/common';

export const Token = createParamDecorator((data, context: ExecutionContext) => {
  const req = context.switchToHttp().getRequest();

  const token = req.token;

  if (!token) {
    throw new InternalServerErrorException(
      'Request에 token 프로퍼티가 존재하지 않습니다.',
    );
  }

  return token;
});
