import {
  Controller,
  DefaultValuePipe,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ConfigType } from '@nestjs/config';
import { ApiTags } from '@nestjs/swagger';
import { MqAlertService } from '@app/mq-alert/mq-alert.service';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(
    private readonly memberService: MemberService,
    private readonly mqAlertService: MqAlertService,
  ) {}

  @Get()
  public async getAll(
    @Query('page', new DefaultValuePipe(0), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return await this.memberService.getAll(page, size);
  }
  /**
   *
   * @param id : id is ulid
   */
  @Get('/:id')
  public async getById(@Param('id') id: string) {
    return await this.memberService.getById(id);
  }

  @Get('/validate/:emai')
  public async validateEmailExist() {}
}
