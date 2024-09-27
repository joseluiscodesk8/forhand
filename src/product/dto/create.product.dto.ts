import {
  IsNotEmpty,
  IsString,
  IsNumber,
  IsOptional,
  Min,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateProductDto {
  @ApiProperty({ description: 'nombre del produto' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'Presio del producto' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  price: number;

  @ApiProperty({ description: 'Descripcion del producto' })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Stock del producto' })
  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  stock: number;
}
