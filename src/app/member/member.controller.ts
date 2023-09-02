import {
  Body,
  Controller,
  DefaultValuePipe,
  Delete,
  Get,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { ConfigType } from '@nestjs/config';
import {
  ApiBadRequestResponse,
  ApiConsumes,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { CommonResponseDto } from '@app/common.response.dto';
import { MemberEntity } from '@domain/member/member.entity';
import { MEMBER_EXCEPTION_MSG } from '@infrastructure/exception/member';
import {
  CheckTypeValidationPipe,
  validateTypeArray,
} from './validate-type.filter';
import { CheckType } from '@domain/member/member.enum';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { AUTHENTICATION_EXCEPTION_MSG } from '@infrastructure/exception/authentication';
import { FilteredException } from '@infrastructure/types/type';
import { WithdrawMemberDto } from './dto/withdraw-member.dto';

@Controller('member')
@ApiTags('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Get()
  @ApiOperation({
    summary: '모든 회원 정보를 가져옵니다.',
    description: 'Pagination의 기본값은 page : 0, size : 10 입니다',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: '불러올 페이지',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: '불러올 게시물 갯수',
  })
  @ApiOkResponse({
    type: MemberEntity,
    isArray: true,
  })
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
  @ApiOperation({
    summary: 'id를 통해 회원 정보를 가져옵니다',
  })
  @ApiOkResponse({
    type: MemberEntity,
  })
  @ApiBadRequestResponse({
    type: FilteredException,
    description: [MEMBER_EXCEPTION_MSG.MemberNotFound.description].join(', '),
  })
  public async getById(@Param('id') id: string) {
    return await this.memberService.getById(id);
  }

  @Get('/validate/:type/:value')
  @ApiOperation({
    summary:
      '해당 값이 사용가능한 값인지 확인합니다. Unique Value에 대한 체크입니다.',
  })
  @ApiOkResponse({
    type: CommonResponseDto,
  })
  @ApiParam({
    name: 'type',
    required: true,
    description: `${validateTypeArray.join(', ')} 중 하나여야 합니다.`,
  })
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
  @ApiOperation({
    summary: '회원가입을 진행합니다.',
  })
  @ApiOkResponse({
    type: MemberEntity,
  })
  @ApiBadRequestResponse({
    type: FilteredException,
    description: [
      MEMBER_EXCEPTION_MSG.EmailUnavailable.description,
      MEMBER_EXCEPTION_MSG.NicknameUnavailable.description,
    ].join(','),
  })
  public async createMember(
    @Body() dto: CreateMemberDto,
  ): Promise<MemberEntity> {
    console.log('Here');
    const result = await this.memberService.createMember(dto);
    return result;
  }

  @Patch()
  @ApiOperation({
    summary: '회원정보를 수정합니다',
  })
  @ApiOkResponse({
    type: MemberEntity,
  })
  @ApiBadRequestResponse({
    type: FilteredException,
    description: [
      MEMBER_EXCEPTION_MSG.NicknameUnavailable.description,
      MEMBER_EXCEPTION_MSG.MemberNotFound.description,
    ].join(', '),
  })
  @ApiUnauthorizedResponse({
    type: FilteredException,
    description: [
      AUTHENTICATION_EXCEPTION_MSG.PasswordUnmatched.description,
    ].join(', '),
  })
  public async updateMember(
    @Body() dto: UpdateMemberDto,
  ): Promise<MemberEntity> {
    const result = await this.memberService.updateMember(dto);
    return result;
  }

  @Delete()
  @ApiOperation({
    summary: '회원탈퇴를 진행합니다',
  })
  @ApiOkResponse({
    type: CommonResponseDto,
  })
  @ApiBadRequestResponse({
    type: FilteredException,
    description: [MEMBER_EXCEPTION_MSG.MemberNotFound.description].join(', '),
  })
  @ApiUnauthorizedResponse({
    type: FilteredException,
    description: [
      AUTHENTICATION_EXCEPTION_MSG.PasswordUnmatched.description,
    ].join(', '),
  })
  public async withdrawMember(
    @Body() dto: WithdrawMemberDto,
  ): Promise<CommonResponseDto> {
    const result = await this.memberService.withdrawMember(dto);
    return new CommonResponseDto({
      msg: result,
    });
  }
}
