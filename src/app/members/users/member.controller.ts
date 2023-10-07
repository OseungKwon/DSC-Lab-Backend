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
import { UserMemberInterface } from './member.interface';
import { UserMemberDocs } from './member.docs';
import { GetUser } from '@app/authorization/decorator/get-user.decorator';
import { UserMemberService } from './member.service';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { User } from '@prisma/client';
import { UserJwtStrategy } from '@app/authentication/member/strategy/user-jwt.strategy';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { FileLimitFactory } from '@infrastructure/util/multer-option.factory';
import { ProfileImageConfig } from '@infrastructure/util/file-limit.config';
import { FileNameEncoderPipe } from '@infrastructure/util';

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
  @UseInterceptors(
    FileInterceptor('profile', FileLimitFactory(ProfileImageConfig)),
  )
  @UserMemberDocs.editProfile
  editProfile(
    @GetUser() uid: User,
    @Body() dto: EditProfileDto,
    @UploadedFile(FileNameEncoderPipe) file: Express.Multer.File,
  ) {
    return this.memberService.editProfile(uid, dto, file);
  }

  @Delete()
  serviceWithdraw(@GetUser() uid: User, @Body() dto: WithdrawServiceDTO) {
    return this.memberService.serviceWithdraw(uid, dto);
  }
}
