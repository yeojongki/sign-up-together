import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { AuthService } from '../modules/auth/auth.service';
import { LoginInfo } from '@/interfaces';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {
    // StrategyOptions
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: configService.get('JWT_SECRET'),
      ignoreExpiration: false,
      jsonWebTokenOptions: {
        expiresIn: configService.get('TOKEN_EXPIRED'),
      },
    });
  }

  async validate({ username, password }: LoginInfo) {
    return await this.authService.validateUser(username, password);
  }
}
