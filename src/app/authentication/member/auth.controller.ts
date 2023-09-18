import { Body, Controller, Post } from '@nestjs/common';
import { MemberAuthDocs } from './auth.docs';
import { MemberAuthInterface } from './auth.interface';
import { UserSignInDto } from './dto/sign-in.dto';
import { UserSignUpDto } from './dto/sign-up.dto';
import { MemberService } from './auth.service';

@Controller()
@MemberAuthDocs.Controller
export class MemberController implements MemberAuthInterface {
  constructor(private service: MemberService) {}

  @Post('/signup')
  @MemberAuthDocs.signup
  async signup(@Body() dto: UserSignUpDto) {
    return await this.service.signup(dto);
  }

  @Post('/singin')
  @MemberAuthDocs.singin
  async singin(@Body() dto: UserSignInDto) {
    return await this.service.singin(dto);
  }
}
