import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { UserMemberInterface } from './member.interface';
import { UserMemberDocs } from './member.docs';
import { GetUser } from '@app/authorization/decorator/get-user.decorator';
import { UserMemberService } from './member.service';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { User } from '@prisma/client';
import { UserJwtStrategy } from '@app/authentication/member/strategy/user-jwt.strategy';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';

@Controller()
@UseGuards(UserJwtStrategy)
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
  editProfile(@GetUser() uid: User, @Body() dto: EditProfileDto) {
    return this.memberService.editProfile(uid, dto);
  }

  @Delete()
  serviceWithdraw(@GetUser() uid: User, @Body() dto: WithdrawServiceDTO) {
    return this.memberService.serviceWithdraw(uid, dto);
  }
}
