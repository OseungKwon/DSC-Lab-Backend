import { Controller, Get, Patch } from '@nestjs/common';
import { UserMemberInterface } from './member.interface';
import { UserMemberDocs } from './member.docs';
import { GetUser } from '@app/authorization/decorator/get-user.decorator';
import { UserMemberService } from './member.service';

@Controller()
@UserMemberDocs.Controller
export class UserMemberController implements UserMemberInterface {
  constructor(private readonly memberService: UserMemberService) {}

  @Get()
  @UserMemberDocs.getProfile
  getProfile(@GetUser('id') uid: string) {
    return this.memberService.getProfile(uid);
  }

  @Patch()
  @UserMemberDocs.editProfile
  editProfile(@GetUser('id') uid: string) {
    throw new Error('Method not implemented.');
  }
}
