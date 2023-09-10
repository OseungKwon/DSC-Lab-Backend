import { CommonResponseDto } from '@app/common.response.dto';
import { MemberEntity } from '@domain/member/member.entity';
import { CheckType } from '@domain/member/member.enum';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { WithdrawMemberDto } from './dto/withdraw-member.dto';
import { CheckTypeValidationPipe } from './filter/validate-type.filter';
import { MemberService } from './member.service';
import { MemberDocs } from './member.swagger';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @MemberDocs.getAll()
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
  @MemberDocs.getById()
  public async getById(@Param('id') id: string) {
    return await this.memberService.getById(id);
  }

  @Get('/validate/:type/:value')
  @MemberDocs.isAvailableValue()
  public async isAvailableValue(
    @Param('type', CheckTypeValidationPipe) tp: CheckType,
    @Param('value') val: string,
  ) {
    const result = await this.memberService.isAvailableValue(tp, val);
    return new CommonResponseDto({
      msg: result,
    });
  }

  @Post()
  @MemberDocs.createMember()
  public async createMember(
    @Body() dto: CreateMemberDto,
  ): Promise<MemberEntity> {
    console.log('Here');
    const result = await this.memberService.createMember(dto);
    return result;
  }

  @Patch()
  @MemberDocs.updateMember()
  public async updateMember(
    @Body() dto: UpdateMemberDto,
  ): Promise<MemberEntity> {
    const result = await this.memberService.updateMember(dto);
    return result;
  }

  @Delete()
  @MemberDocs.withdrawMember()
  public async withdrawMember(
    @Body() dto: WithdrawMemberDto,
  ): Promise<CommonResponseDto> {
    const result = await this.memberService.withdrawMember(dto);
    return new CommonResponseDto({
      msg: result,
    });
  }
}
