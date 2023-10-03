import { AssistantMemberInterface } from '@app/members/assistant/member.interface';
import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Assistant, AssistantRole, Status } from '@prisma/client';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { AssistantMemberService } from '@app/members/assistant/member.service';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import { GetAssistant } from '@app/authorization/decorator/get-assistant.decorator';
import { AssistantGuard } from '@app/authentication/assistant/guard/assistant-jwt.guard';
import { AssistantRoleGuard } from '@app/authorization/guard';
import { AvailableAssistant } from '@app/authorization/decorator';
import { AssistantMemberDocs } from '@app/members/assistant/member.docs';

@Controller()
@UseGuards(AssistantGuard)
@AssistantMemberDocs.Controller
export class AssistantMemberController implements AssistantMemberInterface {
  constructor(private readonly memberService: AssistantMemberService) {}
  @Get()
  @AssistantMemberDocs.getProfile
  getProfile(@GetAssistant('id') aid: string) {
    return this.memberService.getProfile(aid);
  }

  @Patch()
  @AssistantMemberDocs.editProfile
  editProfile(
    @GetAssistant() assistant: Assistant,
    @Body() dto: EditAssistantDto,
  ) {
    return this.memberService.editProfile(assistant, dto);
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
  getUserInfo(@Param('uid') uid: string) {
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
    @Param('uid') uid: string,
    @Body() dto: ChangeUserStatusDto,
  ) {
    return this.memberService.changeUserStatus(uid, dto);
  }
}
