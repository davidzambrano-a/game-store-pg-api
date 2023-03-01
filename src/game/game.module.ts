import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GameService } from 'src/services/game.service';
import { GameEntity } from './entities/game.entity';
import { GameController } from './game.controller';

@Module({
  imports: [TypeOrmModule.forFeature([GameEntity])],
  controllers: [GameController],
  providers: [GameService], // Important
})
export class GameModule {}
