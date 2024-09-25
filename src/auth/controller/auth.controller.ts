import { Controller, Post, Body } from '@nestjs/common';
import { ClientLoginDto } from '../dto/client.login.dto';
import { AdminLoginDto } from '../dto/admin.login.dto';
import { AuthService } from '../service/auth.service';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('auth') // Agrupamos los endpoints de autenticación
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('client/login')
  @ApiOperation({ summary: 'Iniciar sesión como cliente' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async clientLogin(@Body() loginDto: ClientLoginDto) {
    return this.authService.validateClient(loginDto);
  }

  @Post('admin/login')
  @ApiOperation({ summary: 'Iniciar sesión como administrador' })
  @ApiResponse({ status: 200, description: 'Inicio de sesión exitoso' })
  @ApiResponse({ status: 401, description: 'Credenciales incorrectas' })
  async adminLogin(@Body() loginDto: AdminLoginDto) {
    return this.authService.validateAdmin(loginDto);
  }
}
