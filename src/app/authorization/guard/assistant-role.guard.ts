// Standard Packages
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

// Third-party Packages
import { Request } from 'express';
import { Assistant, AssistantRole } from '@prisma/client';

// Custom Packages
import { AvailableAssistant } from '../decorator';
import { EnumToArray } from '@infrastructure/util/enumToArray';

@Injectable()
export class AssistantRoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    // Get available assistants role
    const availableRoles = this.reflector.get(
      AvailableAssistant,
      context.getHandler(),
    );

    /** If 'all', return all of the array of assistant role */
    const roles =
      availableRoles === 'all'
        ? EnumToArray<AssistantRole>(AssistantRole)
        : availableRoles;

    const request = context.switchToHttp().getRequest<Request>();

    // Get user from request
    const user: Assistant = request?.user as Assistant;

    // If user not found or user has no role
    if (!user || !user?.role) {
      throw new ForbiddenException('Forbidden Request');
    }
    // User exist and also has role field
    else {
      // If user's role inclueded in available role
      if (!roles.includes(user.role)) {
        throw new ForbiddenException('Forbidden Request');
      }
    }

    return true;
  }
}
