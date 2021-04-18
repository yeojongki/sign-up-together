import { IsOptional, MaxLength, IsNotEmpty, Length } from 'class-validator';
import { Column, Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { BaseEntity } from '@/shared/entities/base.entity';
import { CrudValidationGroups } from '@nestjsx/crud';
import { Exclude } from 'class-transformer';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity('user')
export class User extends BaseEntity {
  @ApiProperty()
  @MaxLength(30, { always: true })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column({ unique: true })
  username: string;

  @ApiProperty()
  @IsNotEmpty({ groups: [CREATE] })
  @Length(6, 16, { always: true })
  @Column({ type: 'char', length: 64 })
  password: string;

  @ApiProperty()
  @Column({ default: true })
  isActive: boolean;

  @Column({ type: 'timestamp', nullable: true })
  @Exclude({ toPlainOnly: true })
  lastLoginAt: Date;

  @Column({ nullable: true })
  @Exclude({ toPlainOnly: true })
  lastLoginIp: string;

  accessToken?: string;
  expiresIn?: number;
}
