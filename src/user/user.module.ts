import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EncoderService } from '../services/encoder.service';
import { UserService } from '../services/user.service';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, EncoderService], // Important
})
export class UserModule {}
