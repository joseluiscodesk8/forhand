import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { User } from 'src/users/entity/user.entity';
import { Client } from 'src/users/entity/client.entity';
import { Admin } from 'src/users/entity/admin.entity';
import { CreateClientDto } from 'src/users/dto/create.client.dto';
import { CreateAdminDto } from 'src/users/dto/create.admin.dto';
import { UpdateClientDto } from 'src/users/dto/update.client.dto';
import { UpdateAdminDto } from 'src/users/dto/update.admin.dto';

@Injectable()
export class UsersService {
  private readonly SALT_ROUNDS = 10;

  constructor(
    @InjectRepository(User) private usersRepository: Repository<User>,
    @InjectRepository(Client) private clientRepository: Repository<Client>,
    @InjectRepository(Admin) private adminRepository: Repository<Admin>,
  ) {}

  getSkate(): string {
    return 'patinando todos los malditos dias';
  }

  async createClient(createClientDto: CreateClientDto): Promise<User> {
    // Hasheamos la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(
      createClientDto.password,
      this.SALT_ROUNDS,
    );

    const user = this.usersRepository.create({
      ...createClientDto,
      password: hashedPassword, 
      role: 'client',
    });

    try {
      const savedUser = await this.usersRepository.save(user);

      const client = this.clientRepository.create({
        ...createClientDto,
        user: savedUser,
      });
      await this.clientRepository.save(client);

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }

  async createAdmin(createAdminDto: CreateAdminDto): Promise<User> {
    // Hasheamos la contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(
      createAdminDto.password,
      this.SALT_ROUNDS,
    );

    const user = this.usersRepository.create({
      ...createAdminDto,
      password: hashedPassword, 
      role: 'admin',
    });

    try {
      const savedUser = await this.usersRepository.save(user);

      const admin = this.adminRepository.create({
        ...createAdminDto,
        user: savedUser,
      });
      await this.adminRepository.save(admin);

      return savedUser;
    } catch (error) {
      if (error.code === '23505') {
        throw new ConflictException('El email ya está registrado');
      }
      throw error;
    }
  }
  

  async findAll(): Promise<User[]> {
    return this.usersRepository.find();
  }

  async findClients(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: 'client' } });
  }

  async findAdmins(): Promise<User[]> {
    return this.usersRepository.find({ where: { role: 'admin' } });
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.usersRepository.findOne({ where: { email } });
  }

  async updateClient(
    id: number,
    updateClientDto: UpdateClientDto,
  ): Promise<Client> {
    const client = await this.clientRepository.findOne({ where: { id } });
    if (!client) {
      throw new Error('Client not found');
    }

    Object.assign(client, updateClientDto);
    return this.clientRepository.save(client);
  }

  async updateAdmin(
    id: number,
    updateAdminDto: UpdateAdminDto,
  ): Promise<Admin> {
    const admin = await this.adminRepository.findOne({ where: { id } });
    if (!admin) {
      throw new Error('Admin not found');
    }

    Object.assign(admin, updateAdminDto);
    return this.adminRepository.save(admin);
  }

}
