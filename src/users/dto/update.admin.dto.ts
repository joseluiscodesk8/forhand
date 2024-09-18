import { IsString, IsOptional } from 'class-validator';

export class UpdateAdminDto {
  @IsString()
  @IsOptional()
  someAdminSpecificField?: string;
}