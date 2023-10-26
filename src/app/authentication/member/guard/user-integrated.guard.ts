// Standard Packages
import { UseGuards, applyDecorators } from '@nestjs/common';

// Third-party Packages

// Custom Packages
import { UserValidateGuard } from './user-validate.guard';
import { MemberGuard } from './user-jwt.guard';

export const IntegratedUserGuard = applyDecorators(
  UseGuards(MemberGuard, UserValidateGuard),
);
