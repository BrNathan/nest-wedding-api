import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Group } from 'src/group/entity/group.entity';
import { Guest } from 'src/guest/entity/guest.entity';
import { UserInvitation } from 'src/user-invitation/entity/user-invitation.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user' })
export class User extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    unique: true,
    length: 6,
  })
  username: string;

  @Column({
    unique: true,
    nullable: true,
  })
  email?: string;

  @Column()
  password: string;

  @Column()
  salt: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column({
    default: false,
  })
  isAlreadyConnected: boolean;

  @ManyToOne(() => Group)
  group: Group;

  @OneToMany(() => UserInvitation, (userInvitation) => userInvitation.user, {
    eager: true,
  })
  userInvitations?: UserInvitation[];

  @OneToMany(() => Guest, (guest) => guest.user, {
    eager: true,
  })
  guests: Guest[];
}
