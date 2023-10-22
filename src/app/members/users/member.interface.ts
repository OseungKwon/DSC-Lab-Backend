import { CommonReturnType } from '@infrastructure/types/type';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { User } from '@prisma/client';
import { WithdrawServiceDTO } from './dto/withdraw-service.dto';

export interface UserMemberInterface {
  getProfile(uid: number): CommonReturnType;

  editProfile(
    uid: User,
    dto: EditProfileDto,
    file: Express.Multer.File,
  ): CommonReturnType;

  serviceWithdraw(uid: User, dto: WithdrawServiceDTO): CommonReturnType;
}
