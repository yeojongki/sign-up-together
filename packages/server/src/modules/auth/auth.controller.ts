import { Controller, Post, Ip, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { AuthUser } from './dto/auth-user';

@ApiTags('认证模块')
@Controller('auth')
export class AuthController {
  constructor(public authService: AuthService) {}

  @Post('login')
  async login(@Ip() ip: string, @Body() body: AuthUser) {
    return this.authService.login(ip, body);
  }
}
