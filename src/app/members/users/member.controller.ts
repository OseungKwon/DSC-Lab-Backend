import { UserMemberInterface } from './member.interface';

export class UserMemberController implements UserMemberInterface {
  getProfile(uid: string) {
    throw new Error('Method not implemented.');
  }
  editProfile(uid: string) {
    throw new Error('Method not implemented.');
  }
}
