// Standard Packages
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Third-party Packages
import { Status, User, UserRole } from '@prisma/client';
import { Request } from 'express';

// Custom Packages
import { AvailableUser } from '../decorator';
import { EnumToArray } from '@infrastructure/util';

@Injectable()
export class UserRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get available user role
    const availableRoles = this.reflector.get(
      AvailableUser,
      context.getHandler(),
    );

    /** If 'all', return all of the array of user role */
    const roles =
      availableRoles === 'all'
        ? EnumToArray<UserRole>(UserRole)
        : availableRoles;

    const request = context.switchToHttp().getRequest<Request>();
    const user: User = request?.user as User;

    // If user not found or user has no role
    if (!user || !user.role) {
      throw new ForbiddenException('Forbidden Request');
    }
    //User exist and also has role fields
    else {
      // If user's role included in available role
      if (!roles.includes(user.role)) {
        throw new ForbiddenException('Forbidden Request');
      }
    }

    return true;
  }
}
