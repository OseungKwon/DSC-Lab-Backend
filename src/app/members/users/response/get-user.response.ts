import { ApiProperty } from '@nestjs/swagger';
import { $Enums, User } from '@prisma/client';

export class GetUserResponse implements Omit<User, 'password'> {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  groupId: string;

  @ApiProperty({
    enum: $Enums.UserRole,
  })
  role: $Enums.UserRole;

  @ApiProperty({
    enum: $Enums.Status,
  })
  status: $Enums.Status;

  @ApiProperty()
  profileKey: string;

  @ApiProperty()
  profileURL: string;

  @ApiProperty()
  enrolledIn: Date;

  @ApiProperty()
  loginAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
