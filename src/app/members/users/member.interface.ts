// Standard Packages

// Third-party Packages
import { User } from '@prisma/client';

// Custom Packages
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { CommonReturnType } from '@infrastructure/types/type';
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
