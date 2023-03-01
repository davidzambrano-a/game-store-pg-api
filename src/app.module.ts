import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { 
  DB_DATABASE,
  DB_HOST, 
  DB_PASSWORD, 
  DB_PORT,
  DB_USERNAME,
 } from './dbConfig/dbConsts';
import { GameModule } from './game/game.module';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get(DB_HOST),
        port: +configService.get<number>(DB_PORT),
        username: configService.get(DB_USERNAME),
        password: configService.get(DB_PASSWORD),
        database: configService.get(DB_DATABASE),
        autoLoadEntities: true, // Every time we create a new Entity. It'll be updated
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true, // ONLY for Development. NEVER in Production
      }),
      inject: [ConfigService]
    }),
    GameModule,
    AuthModule,
    UserModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
