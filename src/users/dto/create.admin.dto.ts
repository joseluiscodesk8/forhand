import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdminDto {
  @ApiProperty({ description: 'Correo electrónico del administrador' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña del administrador' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
