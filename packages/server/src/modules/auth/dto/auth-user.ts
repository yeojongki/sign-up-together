import { ApiProperty } from '@nestjs/swagger';

export class AuthUser {
  @ApiProperty()
  username: string;

  @ApiProperty()
  password: string;
}
