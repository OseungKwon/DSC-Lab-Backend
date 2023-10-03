import { Assistant, Status } from '@prisma/client';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';

export interface AssistantMemberInterface {
  getProfile(aid: string);

  editProfile(assistant: Assistant, dto: EditAssistantDto);

  getUserList(status: Status, page: number, size: number);

  getUserInfo(uid: string);

  changeUserStatus(uid: string, dto: ChangeUserStatusDto);
}
