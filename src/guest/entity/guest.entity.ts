import { TimestampEntities } from 'src/generics/timestamp.entities';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'guest',
})
export class Guest extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    nullable: true,
  })
  isSpouse?: boolean;

  @Column({
    nullable: true,
  })
  isOther?: boolean;

  @Column({
    nullable: true,
  })
  isUser?: boolean;

  @Column({
    nullable: true,
  })
  isChildren?: boolean;

  @Column({
    nullable: true,
  })
  age?: number;

  @ManyToOne(() => User, (user) => user.guests)
  user: User;
}
