// Standard Packages
import { Reflector } from '@nestjs/core';

// Third-party Packages
import { AssistantRole } from '@prisma/client';

// Custom Packages

export const AvailableAssistant = Reflector.createDecorator<
  AssistantRole[] | 'all'
>();
