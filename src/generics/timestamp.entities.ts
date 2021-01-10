import { CreateDateColumn, DeleteDateColumn, UpdateDateColumn } from 'typeorm';

export abstract class TimestampEntities {
  @CreateDateColumn({
    update: false,
  })
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn({
    update: false,
  })
  deletedAt: Date;
}
