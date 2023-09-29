import { CommonReturnType } from '@infrastructure/types/type';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { MemberSignInDto } from './dto/sign-in.dto';

export interface MemberAuthInterface {
  signup(dto: MemberSignUpDto): CommonReturnType;
  singin(dto: MemberSignInDto): CommonReturnType;
  credential(type: string, value: string): CommonReturnType;
}
