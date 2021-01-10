import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Invitation } from 'src/invitation/entity/invitation.entity';
import { User } from 'src/user/entity/user.entity';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({
  name: 'user-invitation',
})
export class UserInvitation extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.userInvitations)
  user: User;

  @ManyToOne(() => Invitation, (invitation) => invitation.userInvitations, {
    eager: true,
  })
  invitation: number;

  @Column({ nullable: true })
  answer?: boolean;
}
