import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from './service/users.service';
import { UsersController } from './controlles/users.controller';
import { User } from './entity/user.entity';
import { Client } from './entity/client.entity';
import { Admin } from './entity/admin.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Client, Admin])],
  providers: [UsersService],
  controllers: [UsersController],
  exports: [UsersService],
})
export class UsersModule {}
