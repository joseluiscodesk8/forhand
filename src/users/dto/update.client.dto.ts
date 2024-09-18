import { IsString, IsOptional } from 'class-validator';

export class UpdateClientDto {
  @IsString()
  @IsOptional()
  someClientSpecificField?: string;
}

