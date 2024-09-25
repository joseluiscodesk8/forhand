import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { UsersService } from 'src/users/service/users.service';
import { CreateClientDto } from 'src/users/dto/create.client.dto';
import { CreateAdminDto } from 'src/users/dto/create.admin.dto';
import { UpdateClientDto } from 'src/users/dto/update.client.dto';
import { UpdateAdminDto } from 'src/users/dto/update.admin.dto';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('users') // Agrupamos los endpoints de usuarios
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: 'Obtener todos los usuarios' })
  @ApiResponse({ status: 200, description: 'Lista de todos los usuarios' })
  findAll() {
    return this.usersService.findAll();
  }

  @Get('clients')
  @ApiOperation({ summary: 'Obtener todos los clientes' })
  @ApiResponse({ status: 200, description: 'Lista de todos los clientes' })
  findClients() {
    return this.usersService.findClients();
  }

  @Get('admins')
  @ApiOperation({ summary: 'Obtener todos los administradores' })
  @ApiResponse({
    status: 200,
    description: 'Lista de todos los administradores',
  })
  findAdmins() {
    return this.usersService.findAdmins();
  }

  @Post('client')
  @ApiOperation({ summary: 'Crear un nuevo cliente' })
  @ApiResponse({ status: 201, description: 'Cliente creado exitosamente' })
  async createClient(@Body() createClientDto: CreateClientDto) {
    return this.usersService.createClient(createClientDto);
  }

  @Post('admin')
  @ApiOperation({ summary: 'Crear un nuevo administrador' })
  @ApiResponse({
    status: 201,
    description: 'Administrador creado exitosamente',
  })
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Put('client/:id')
  @ApiOperation({ summary: 'Actualizar un cliente por ID' })
  @ApiParam({ name: 'id', description: 'El ID del cliente' })
  @ApiResponse({ status: 200, description: 'Cliente actualizado exitosamente' })
  updateClient(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ) {
    return this.usersService.updateClient(+id, updateClientDto);
  }

  @Put('admin/:id')
  @ApiOperation({ summary: 'Actualizar un administrador por ID' })
  @ApiParam({ name: 'id', description: 'El ID del administrador' })
  @ApiResponse({
    status: 200,
    description: 'Administrador actualizado exitosamente',
  })
  updateAdmin(@Param('id') id: number, @Body() updateAdminDto: UpdateAdminDto) {
    return this.usersService.updateAdmin(+id, updateAdminDto);
  }
}
