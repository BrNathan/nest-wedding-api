import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'user' })
export class User extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @PrimaryColumn({
    unique: true,
    length: 6,
  })
  username: string;

  @Column({
    unique: true,
  })
  email?: string;

  @Column()
  password: string;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  isAlreadyConnected?: boolean;

  @Column()
  groupId: number;

  // @hasMany(() => Guest)
  // guests?: Guest[];

  // @hasMany(() => Invitation, {
  //   through: {
  //     model: () => UserInvitation,
  //     keyFrom: 'userId',
  //     keyTo: 'invitationId'
  //   }
  // })
  // invitations?: Invitation[];
}
