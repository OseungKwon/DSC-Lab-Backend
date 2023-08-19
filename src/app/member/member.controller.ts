import { Controller, Get, Param } from '@nestjs/common';
import { MemberService } from './member.service';

@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   *
   * @param id : id is ulid
   */
  @Get('/:id')
  public getById(@Param('id') id: string) {
    return this.memberService.getById(id);
  }
}
