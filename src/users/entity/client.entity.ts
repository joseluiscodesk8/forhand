import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Client {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  someClientSpecificField: string; // Campos específicos para clientes


  @OneToOne(() => User, (user) => user.client)
  user: User;
}
