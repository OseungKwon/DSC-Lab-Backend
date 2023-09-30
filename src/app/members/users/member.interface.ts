import { CommonReturnType } from '@infrastructure/types/type';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { User } from '@prisma/client';

export interface UserMemberInterface {
  getProfile(uid: string): CommonReturnType;

  editProfile(uid: User, dto: EditProfileDto): CommonReturnType;
}
