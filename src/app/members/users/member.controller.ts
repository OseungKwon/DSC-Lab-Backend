import { MemberGuard } from '@app/authentication/member/guard/user-jwt.guard';
import { GetUser } from '@app/authorization/decorator/get-user.decorator';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { FileNameEncoderPipe } from '@infrastructure/util';
import { ProfileImageConfig } from '@infrastructure/util/file-limit.config';
import { FileLimitFactory } from '@infrastructure/util/multer-option.factory';
import {
  Body,
  Controller,
  Delete,
  Get,
  Patch,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';
import { UserMemberDocs } from './member.docs';
import { UserMemberInterface } from './member.interface';
import { UserMemberService } from './member.service';

@Controller()
@UseGuards(MemberGuard)
@UserMemberDocs.Controller
export class UserMemberController implements UserMemberInterface {
  constructor(private readonly memberService: UserMemberService) {}

  @Get()
  @UserMemberDocs.getProfile
  getProfile(@GetUser('id') uid: number) {
    return this.memberService.getProfile(uid);
  }

  @Patch()
  @UseInterceptors(
    FileInterceptor('profile', FileLimitFactory(ProfileImageConfig)),
  )
  @UserMemberDocs.editProfile
  editProfile(
    @GetUser() user: User,
    @Body() dto: EditProfileDto,
    @UploadedFile(FileNameEncoderPipe) file: Express.Multer.File,
  ) {
    return this.memberService.editProfile(user, dto, file);
  }

  @Delete()
  serviceWithdraw(@GetUser() user: User, @Body() dto: WithdrawServiceDTO) {
    return this.memberService.serviceWithdraw(user, dto);
  }
}
