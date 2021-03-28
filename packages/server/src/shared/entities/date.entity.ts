import { Column, DeleteDateColumn } from 'typeorm';
import { Exclude } from 'class-transformer';

export class DateEntity {
  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt!: Date;

  @Column({ type: 'timestamp', nullable: true, onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt?: Date;

  // SOFT DELETE
  @Exclude({ toPlainOnly: true })
  @DeleteDateColumn({ type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
