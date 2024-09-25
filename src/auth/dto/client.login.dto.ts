import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ClientLoginDto {
  @ApiProperty({ description: 'Correo electrónico del cliente' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ description: 'Contraseña del cliente' })
  @IsString()
  @IsNotEmpty()
  password: string;

  @ApiProperty({ description: 'Nombre del cliente' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
