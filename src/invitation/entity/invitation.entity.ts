import { TimestampEntities } from 'src/generics/timestamp.entities';
import { UserInvitation } from 'src/user-invitation/entity/user-invitation.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'invitation',
})
export class Invitation extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    length: 3,
    nullable: false,
    unique: true,
  })
  code: string;

  @Column({
    length: 50,
    nullable: false,
  })
  label: string;

  @OneToMany(() => UserInvitation, (userInvitation) => userInvitation.user)
  userInvitations?: UserInvitation[];
}
