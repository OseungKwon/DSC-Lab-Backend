import { UseGuards, applyDecorators } from '@nestjs/common';
import { UserValidateGuard } from './user-validate.guard';
import { MemberGuard } from './user-jwt.guard';

export const IntegratedUserGuard = applyDecorators(
  UseGuards(UserValidateGuard),
  UseGuards(MemberGuard),
);
