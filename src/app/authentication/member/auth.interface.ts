// Standard Packages

// Third-party Packages

// Custom Packages
import { CommonReturnType } from '@infrastructure/types/type';
import { MemberSignInDto } from './dto/sign-in.dto';
import { MemberSignUpDto } from './dto/sign-up.dto';

export interface MemberAuthInterface {
  signup(dto: MemberSignUpDto): CommonReturnType;
  singin(dto: MemberSignInDto): CommonReturnType;
  credential(type: string, value: string): CommonReturnType;
  confirmEmail(id: number): CommonReturnType;
  confirmEmailCode(uid: number, key: string): CommonReturnType;
}
