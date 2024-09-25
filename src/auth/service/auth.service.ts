import { Injectable } from '@nestjs/common';
import { ClientLoginDto } from '../dto/client.login.dto';  // Importa el DTO de cliente
import { AdminLoginDto } from '../dto/admin.login.dto';    // Importa el DTO de administrador
import { UsersService } from '../../users/service/users.service';  // Asegúrate de la ruta correcta
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateClient(loginDto: ClientLoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && user.password === loginDto.password) {
      // Aquí puedes crear el token o devolver lo que necesites
      return user; // Devuelve el usuario o cualquier dato que necesites
    }
    return null; // Devuelve null si no se encuentra el usuario o la contraseña es incorrecta
  }

  async validateAdmin(loginDto: AdminLoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (user && user.password === loginDto.password) {
      return user; // O devuelve un token
    }
    return null; // Devuelve null si no se encuentra el usuario o la contraseña es incorrecta
  }
}

