import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Client } from './client.entity';
import { Admin } from './admin.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: 'client' | 'admin';

  @OneToOne(() => Client, (client) => client.user)
  @JoinColumn()
  client?: Client;

  @OneToOne(() => Admin, (admin) => admin.user)
  @JoinColumn()
  admin?: Admin;
}
