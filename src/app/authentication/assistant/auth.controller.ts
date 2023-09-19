import { Body, Controller, Get, Post } from '@nestjs/common';
import { AssistantAuthInterface } from './auth.interface';
import { AssistantSignInDto } from './dto/sign-in.dto';
import { AssistantSignUpDto } from './dto/sign-up.dto';
import { AssistantAuthService } from './auth.service';
import { AsssistantAuthDocs } from './auth.docs';

@Controller()
@AsssistantAuthDocs.Controller
export class AssistantAuthController implements AssistantAuthInterface {
  constructor(private service: AssistantAuthService) {}

  @Post('/signup')
  @AsssistantAuthDocs.signup
  async signup(@Body() dto: AssistantSignUpDto) {
    return await this.service.signup(dto);
  }

  @Post('/signin')
  @AsssistantAuthDocs.signin
  async signin(@Body() dto: AssistantSignInDto) {
    return await this.service.signin(dto);
  }
}
