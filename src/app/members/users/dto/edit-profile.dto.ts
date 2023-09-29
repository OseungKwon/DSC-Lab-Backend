import { ApiProperty } from '@nestjs/swagger';

export class EditProfileDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  nickname: string;
}
