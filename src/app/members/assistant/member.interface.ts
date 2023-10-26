// Standard Packages

// Third-party Packages
import { Assistant, Status } from '@prisma/client';

// Custom Packages
import { ChangeUserStatusDto } from '@app/members/assistant/dto/change-user-status.dto';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';
import { CommonReturnType } from '@infrastructure/types/type';

export interface AssistantMemberInterface {
  getProfile(aid: number): CommonReturnType;

  editProfile(
    assistant: Assistant,
    dto: EditAssistantDto,
    file: Express.Multer.File,
  ): CommonReturnType;

  getUserListOverview(): CommonReturnType;

  getUserList(status: Status, page: number, size: number): CommonReturnType;

  getUserInfo(uid: number): CommonReturnType;

  changeUserStatus(uid: number, dto: ChangeUserStatusDto): CommonReturnType;
}
