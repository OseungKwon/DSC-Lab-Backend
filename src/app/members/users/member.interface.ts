import { CommonReturnType } from '@infrastructure/types/type';

export interface UserMemberInterface {
  getProfile(uid: string): CommonReturnType;

  editProfile(uid: string): CommonReturnType;
}
