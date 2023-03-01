import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_KEY } from 'src/dbConfig/dbConsts';
import { AuthService } from 'src/services/auth.service';
import { EncoderService } from 'src/services/encoder.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './strategies/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    // To Login
    PassportModule.register({
      defaultStrategy: 'jwt',
    }),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>(JWT_KEY),
        signOptions: { expiresIn: 1200 }, // 20'
      }),
      inject: [ConfigService],
    }),
],
  controllers: [AuthController],
  providers: [AuthService, EncoderService, ConfigService, JwtStrategy],
  exports: [PassportModule, JwtStrategy], // Important: Export Passport Module
})
export class AuthModule {}
