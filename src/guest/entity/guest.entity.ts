import { TimestampEntities } from 'src/generics/timestamp.entities';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column()
  isSpouse?: boolean;

  @Column()
  isOther?: boolean;

  @Column()
  isUser?: boolean;

  @Column()
  isChildren?: boolean;

  @Column()
  age?: number;

  @Column()
  userId: number;
}
