import { Body, Controller, Get, HttpCode, Post, Query } from '@nestjs/common';
import { MemberAuthDocs } from './auth.docs';
import { MemberAuthInterface } from './auth.interface';
import { MemberService } from './auth.service';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { MemberSignInDto } from './dto/sign-in.dto';
import { UserUniqueCredential } from './type';

@Controller()
@MemberAuthDocs.Controller
export class MemberController implements MemberAuthInterface {
  constructor(private service: MemberService) {}

  @Post('/signup')
  @MemberAuthDocs.signup
  async signup(@Body() dto: MemberSignUpDto) {
    return await this.service.signup(dto);
  }

  @Post('/signin')
  @HttpCode(200)
  @MemberAuthDocs.singin
  async singin(@Body() dto: MemberSignInDto) {
    return await this.service.singin(dto);
  }

  @Get('/credential')
  @MemberAuthDocs.credential
  async credential(
    @Query('type') type: UserUniqueCredential,
    @Query('value') value: string,
  ) {
    return await this.service.credential(type, value);
  }
}
