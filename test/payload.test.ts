// User : Auth

import { AssistantSignInDto } from '@app/authentication/assistant/dto/sign-in.dto';
import { AssistantSignUpDto } from '@app/authentication/assistant/dto/sign-up.dto';
import { MemberSignInDto } from '@app/authentication/member/dto/sign-in.dto';
import { MemberSignUpDto } from '@app/authentication/member/dto/sign-up.dto';
import { EditProfileDto } from '@app/members/users/dto/edit-profile.dto';
import { AssistantRole, UserRole } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as bcrypt from 'bcryptjs';
import { EditAssistantDto } from '@app/members/assistant/dto/edit-assistant.dto';

/**If user want to hash password in test data -> set hash to true*/
export const generateRandomMember = (
  hash: boolean,
): [MemberSignUpDto, MemberSignInDto, EditProfileDto] => {
  const signup: MemberSignUpDto = {
    name: faker.string.alpha(5),
    nickname: faker.string.alpha(10),
    password: faker.string.alpha(10),
    email: `${faker.string.alpha(7)}@mail.hongik.ac.kr`,
    groupId: faker.string.alpha(10),
    role: faker.helpers.enumValue(UserRole),
  };
  const signin: MemberSignInDto = {
    email: signup.email,
    password: signup.password,
  };
  const edit: EditProfileDto = {
    name: signup.name,
    nickname: signup.nickname,
    password: signup.password,
    changedPassword: 'password',
  };
  if (hash) {
    signup.password = bcrypt.hashSync(signup.password);
  }

  return [signup, signin, edit];
};

export const generateRandomAssistant = (
  hash: boolean,
): [AssistantSignUpDto, AssistantSignInDto, EditAssistantDto] => {
  const signup: AssistantSignUpDto = {
    name: faker.string.alpha(5),
    password: faker.string.alpha(10),
    email: `${faker.string.alpha(7)}@mail.hongik.ac.kr`,
    role: faker.helpers.enumValue(AssistantRole),
  };
  const signin: AssistantSignInDto = {
    email: signup.email,
    password: signup.password,
  };
  const edit: EditAssistantDto = {
    name: signup.name,
    password: signup.password,
    changedPassword: 'password',
  };
  if (hash) {
    signup.password = bcrypt.hashSync(signup.password);
  }
  return [signup, signin, edit];
};

export const TestUserSignUpDto: MemberSignUpDto = {
  name: 'test',
  nickname: 'test',
  password: 'test1234!',
  email: 'test@naver.com',
  groupId: '1234',
  role: UserRole.Student,
};

export const User1SignUpDto: MemberSignUpDto = {
  name: 'hoplin',
  nickname: 'nickname',
  password: 'password1234!',
  email: 'jhoplin7259@gmail.com',
  groupId: 'B889047',
  role: UserRole.Student,
};

export const User1SignInDto: MemberSignInDto = {
  email: 'jhoplin7259@gmail.com',
  password: 'password1234!',
};

export const User1EditProfileDto: EditProfileDto = {
  name: User1SignUpDto.name,
  nickname: User1SignUpDto.nickname,
  password: User1SignUpDto.password,
};

export const User2SignUpDto: MemberSignUpDto = {
  name: 'hoplin',
  nickname: 'nickname2',
  password: 'password1234!',
  email: 'jhyoon0815103@gmail.com',
  groupId: 'B889062',
  role: UserRole.Student,
};

export const TestAssistantSignUpDto: AssistantSignUpDto = {
  name: 'testassistant',
  password: 'password',
  email: 'test@test.kr',
  role: 'LabAssistant',
};

export const Assistant1SingUpDto: AssistantSignUpDto = {
  name: 'assistant1',
  password: 'password',
  email: 'assist@hongik.ac.kr',
  role: 'OfficeAssistant',
};

export const Assistant1SignInDto: AssistantSignInDto = {
  email: 'assist@hongik.ac.kr',
  password: 'password',
};
