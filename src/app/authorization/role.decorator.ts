import { Role } from '@domain/member/member.enum';
import { Reflector } from '@nestjs/core';

export const AllowedRole = Reflector.createDecorator<Role[]>();
