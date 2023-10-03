import { Reflector } from '@nestjs/core';
import { AssistantRole } from '@prisma/client';

export const AvailableAssistant = Reflector.createDecorator<
  AssistantRole[] | 'all'
>();
