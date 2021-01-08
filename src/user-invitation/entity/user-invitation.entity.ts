import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'user-invitation',
})
export class UserInvitation extends TimestampEntities {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: number;

  @Column({ nullable: false })
  invitationId: number;

  @Column({ nullable: true })
  answer?: boolean;
}
