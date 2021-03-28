import { Injectable } from '@nestjs/common';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CrudRequest } from '@nestjsx/crud';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';

@Injectable()
export class UserService extends TypeOrmCrudService<User> {
  constructor(@InjectRepository(User) userRepo) {
    super(userRepo);
  }

  async createOne(req: CrudRequest, dto: User): Promise<User> {
    const nextDto = dto;
    if (dto.password) {
      nextDto.password = await this.createPassword(dto.password);
    }
    
    const result = await super.createOne(req, nextDto);
    return result;
  }

  private async createPassword(password: string): Promise<string> {
    const salt = bcrypt.genSaltSync();
    return bcrypt.hashSync(password, salt);
  }
}
