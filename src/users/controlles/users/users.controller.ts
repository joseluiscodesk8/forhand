import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from 'src/users/service/users/users.service';
import { CreateClientDto } from 'src/users/dto/create.client.dto';
import { CreateAdminDto } from 'src/users/dto/create.admin.dto';
import { UpdateClientDto } from 'src/users/dto/update.client.dto';
import { UpdateAdminDto } from 'src/users/dto/update.admin.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  getSkate(): string {
    return this.usersService.getSkate();
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get('clients')
  findClients() {
    return this.usersService.findClients();
  }

  @Get('admins')
  findAdmins() {
    return this.usersService.findAdmins();
  }

  @Post('client')
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.usersService.createClient(createClientDto);
  }

  @Post('admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Put('client/:id')
  updateClient(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.usersService.updateClient(+id, updateClientDto);
  }

  @Put('admin/:id')
  updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.usersService.updateAdmin(+id, updateAdminDto);
  }

}
