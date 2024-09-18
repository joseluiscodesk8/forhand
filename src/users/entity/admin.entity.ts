import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Admin {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  someAdminSpecificField: string; // Campos específicos para administradores

  @OneToOne(() => User, (user) => user.admin)
  user: User;
}
