import { Assistant, Status } from '@prisma/client';
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import { CommonReturnType } from '@infrastructure/types/type';

export interface AssistantMemberInterface {
  getProfile(aid: string): CommonReturnType;

  editProfile(
    assistant: Assistant,
    dto: EditAssistantDto,
    file: Express.Multer.File,
  ): CommonReturnType;

  getUserListOverview(): CommonReturnType;

  getUserList(status: Status, page: number, size: number): CommonReturnType;

  getUserInfo(uid: string): CommonReturnType;

  changeUserStatus(uid: string, dto: ChangeUserStatusDto): CommonReturnType;
}
