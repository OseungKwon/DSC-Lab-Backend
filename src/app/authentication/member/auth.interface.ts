import { CommonReturnType } from '@infrastructure/types/type';
import { UserSignUpDto } from './dto/sign-up.dto';
import { UserSignInDto } from './dto/sign-in.dto';

export interface MemberAuthInterface {
  signup(dto: UserSignUpDto): CommonReturnType;
  singin(dto: UserSignInDto): CommonReturnType;
}
