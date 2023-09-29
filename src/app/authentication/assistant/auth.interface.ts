import { CommonReturnType } from '@infrastructure/types/type';
import { AssistantSignUpDto } from './dto/sign-up.dto';
import { AssistantSignInDto } from './dto/sign-in.dto';

export interface AssistantAuthInterface {
  signup(dto: AssistantSignUpDto): CommonReturnType;
  signin(dto: AssistantSignInDto): CommonReturnType;
  credential(type: string, value: string): CommonReturnType;
}
