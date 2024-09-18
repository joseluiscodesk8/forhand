import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config'; // Importar ConfigModule y ConfigService
import { UsersModule } from './users/users.module';
import { User } from './users/entity/user.entity';
import { Client } from './users/entity/client.entity';
import { Admin } from './users/entity/admin.entity';

@Module({
  imports: [
    // ConfigModule para manejar variables de entorno
    ConfigModule.forRoot({
      isGlobal: true, // hace que las variables de entorno estén disponibles globalmente
    }),
    // Configuración de TypeORM usando forRootAsync
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres', // Puedes cambiarlo si usas otra base de datos
        host: configService.get<string>('DATABASE_HOST'),
        port: configService.get<number>('DATABASE_PORT'),
        username: configService.get<string>('DATABASE_USERNAME'),
        password: configService.get<string>('DATABASE_PASSWORD'),
        database: configService.get<string>('DATABASE_NAME'),
        entities: [User, Client, Admin], // Incluir todas las entidades
        synchronize: true, // Solo para desarrollo; no usar en producción
      }),
    }),
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}