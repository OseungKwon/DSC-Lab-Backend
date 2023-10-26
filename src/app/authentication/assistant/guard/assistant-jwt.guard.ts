// Standard Packages
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Third-party Packages

// Custom Packages

@Injectable()
export class AssistantGuard extends AuthGuard('assist-jwt') {}
