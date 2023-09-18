import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class AssistantGuard extends AuthGuard('assist-jwt') {}
