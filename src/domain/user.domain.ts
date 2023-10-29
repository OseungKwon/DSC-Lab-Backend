// Standard Pacakges
import { ApiProperty } from '@nestjs/swagger';

// Third-party Packages
import { $Enums, User } from '@prisma/client';

export class UserDomain implements User {
  @ApiProperty()
  id: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  nickname: string;

  @ApiProperty()
  password: string;

  @ApiProperty()
  email: string;

  @ApiProperty()
  profileKey: string;

  @ApiProperty()
  profileURL: string;

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
  enrolledIn: Date;

  @ApiProperty()
  loginAt: Date;

  @ApiProperty()
  createdAt: Date;

  @ApiProperty()
  updatedAt: Date;
}
