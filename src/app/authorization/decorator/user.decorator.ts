// Standard Packages
import { Reflector } from '@nestjs/core';
// Third-party Packages
import { UserRole } from '@prisma/client';

// Custom Packages

export const AvailableUser = Reflector.createDecorator<UserRole[] | 'all'>();
