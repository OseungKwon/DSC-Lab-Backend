// Standard Packages
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

// Third-party Packages
import { Assistant, AssistantRole, Status } from '@prisma/client';

// Custom Packages
import { AssistantGuard } from '@app/authentication/assistant/guard/assistant-jwt.guard';
import { AvailableAssistant } from '@app/authorization/decorator';
import { GetAssistant } from '@app/authorization/decorator/get-assistant.decorator';
import { AssistantRoleGuard } from '@app/authorization/guard';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import { AssistantMemberDocs } from '@app/members/assistant/member.docs';
import { AssistantMemberInterface } from '@app/members/assistant/member.interface';
import { AssistantMemberService } from '@app/members/assistant/member.service';
import { FileNameEncoderPipe } from '@infrastructure/util';
import { ProfileImageConfig } from '@infrastructure/util/file-limit.config';
import { FileLimitFactory } from '@infrastructure/util/multer-option.factory';

@Controller()
@UseGuards(AssistantGuard)
@AssistantMemberDocs.Controller
export class AssistantMemberController implements AssistantMemberInterface {
  constructor(private readonly memberService: AssistantMemberService) {}
  @Get()
  @AssistantMemberDocs.getProfile
  getProfile(@GetAssistant('id') aid: number) {
    return this.memberService.getProfile(aid);
  }

  @Patch()
  @AssistantMemberDocs.editProfile
  @UseInterceptors(
    FileInterceptor('profile', FileLimitFactory(ProfileImageConfig)),
  )
  editProfile(
    @GetAssistant() assistant: Assistant,
    @Body() dto: EditAssistantDto,
    @UploadedFile(FileNameEncoderPipe) file: Express.Multer.File,
  ) {
    return this.memberService.editProfile(assistant, dto, file);
  }

  @Get('/user/overview')
  @UseGuards(AssistantRoleGuard)
  @AvailableAssistant([
    AssistantRole.LabAssistant,
    AssistantRole.OfficeAssistant,
  ])
  @AssistantMemberDocs.getUserListOverview
  getUserListOverview() {
    return this.memberService.getUserListOverview();
  }

  @Get('/user')
  @UseGuards(AssistantRoleGuard)
  @AvailableAssistant([
    AssistantRole.LabAssistant,
    AssistantRole.OfficeAssistant,
  ])
  @AssistantMemberDocs.getUserList
  getUserList(
    @Query('status') status: Status,
    @Query('page', ParseIntPipe) page: number,
    @Query('size', ParseIntPipe) size: number,
  ) {
    return this.memberService.getUserList(status, page, size);
  }

  @Get('/user/:uid')
  @UseGuards(AssistantRoleGuard)
  @AvailableAssistant([
    AssistantRole.LabAssistant,
    AssistantRole.OfficeAssistant,
  ])
  @AssistantMemberDocs.getUserInfo
  getUserInfo(@Param('uid', ParseIntPipe) uid: number) {
    return this.memberService.getUserInfo(uid);
  }

  @Patch('/user/:uid')
  @UseGuards(AssistantRoleGuard)
  @AvailableAssistant([
    AssistantRole.LabAssistant,
    AssistantRole.OfficeAssistant,
  ])
  @AssistantMemberDocs.changeUserStatus
  changeUserStatus(
    @Param('uid', ParseIntPipe) uid: number,
    @Body() dto: ChangeUserStatusDto,
  ) {
    return this.memberService.changeUserStatus(uid, dto);
  }
}
