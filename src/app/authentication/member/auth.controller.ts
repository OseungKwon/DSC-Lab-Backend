import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { MemberAuthDocs } from './auth.docs';
import { MemberAuthInterface } from './auth.interface';
import { MemberService } from './auth.service';
import { MemberSignInDto } from './dto/sign-in.dto';
import { MemberSignUpDto } from './dto/sign-up.dto';
import { UserUniqueCredential } from './type';
import { ConfirmEmailDto } from './dto/confirm-email.dto';
import { MemberGuard } from './guard/user-jwt.guard';
import { GetUser } from '@app/authorization/decorator/get-user.decorator';

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

  @Post('/email')
  @UseGuards(MemberGuard)
  @MemberAuthDocs.confirmEmail
  confirmEmail(@GetUser('id') uid: number) {
    return this.service.confirmEmail(uid);
  }

  @Get('/email')
  @MemberAuthDocs.confirmEmailCode
  confirmEmailCode(
    @Query('uid', ParseIntPipe) uid: number,
    @Query('key') code: string,
  ) {
    return this.service.confirmEmailCode(uid, code);
  }
}
