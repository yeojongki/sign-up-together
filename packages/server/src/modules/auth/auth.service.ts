import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { Repository } from 'typeorm';
import { LoginInfo } from '@/interfaces';
import { HttpErrorCode } from '@/constants/http-error-code';
import { User } from '../user/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  async login(ip: string, data: LoginInfo) {
    if (!ip) {
      throw new ForbiddenException({
        message: 'IP error',
        errno: HttpErrorCode.IP_ERROR,
      });
    }

    const where = { username: data.username };
    const user = await this.userRepo.findOne({
      where,
    });

    if (!user) {
      throw new BadRequestException({
        message: '用户不存在',
        error: where,
        errorCode: HttpErrorCode.NOT_FOUND,
      });
    }

    // update user login info
    await this.userRepo.update(user.id, {
      lastLoginIp: ip,
      lastLoginAt: new Date(),
    });

    // delete password
    delete user.password;

    return this.addTokenToUser(user);
  }

  async addTokenToUser(user: User) {
    const nextUser = user;
    const userAuthInfo = await this.createToken(user.id);

    nextUser.accessToken = userAuthInfo.accessToken;
    nextUser.expiresIn = userAuthInfo.expiresIn;

    return nextUser;
  }

  private async createToken(id: string | number) {
    const expiresIn = +this.configService.get('TOKEN_EXPIRED');

    return {
      accessToken: this.jwtService.sign({ id }, { expiresIn }),
      expiresIn,
    };
  }

  async validateUser(username: string, password: string) {
    const user = await this.userRepo.findOne({
      where: { username },
    });

    if (user && user.password === password) {
      const { password, ...result } = user;
      return result;
    }

    return null;
  }
}
