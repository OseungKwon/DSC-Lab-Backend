import { CommonReturnType } from '@infrastructure/types/type';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { MemberSignInDto } from './dto/sign-in.dto';
import { ConfirmEmailDto } from './dto/confirm-email.dto';

export interface MemberAuthInterface {
  signup(dto: MemberSignUpDto): CommonReturnType;
  singin(dto: MemberSignInDto): CommonReturnType;
  credential(type: string, value: string): CommonReturnType;
  confirmEmail(id: number): CommonReturnType;
  confirmEmailCode(uid: number, key: string): CommonReturnType;
}
