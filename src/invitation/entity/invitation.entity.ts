import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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
}
