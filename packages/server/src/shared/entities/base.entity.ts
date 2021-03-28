import { PrimaryGeneratedColumn } from 'typeorm';
import { DateEntity } from './date.entity';

export class BaseEntity extends DateEntity {
  @PrimaryGeneratedColumn('uuid')
  readonly id!: string;
}
