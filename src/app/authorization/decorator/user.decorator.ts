import { Reflector } from '@nestjs/core';
import { UserRole } from '@prisma/client';

export const AvailableUser = Reflector.createDecorator<UserRole[] | 'all'>();
