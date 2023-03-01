import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GameDTO } from '../game/dto/game.dto';
import { GameEntity } from '../game/entities/game.entity';
import { Repository } from 'typeorm';

@Injectable()
export class GameService {

    constructor(
        @InjectRepository(GameEntity)
        private readonly gameRepository: Repository<GameEntity>,
    ) {}

    // *** Get All Games ***
    async getAAllGames(): Promise<GameEntity[]> {
        try {
            const list = await this.gameRepository.find();
            if (list.length > 0) return list;
            throw new NotFoundException({ message: 'Games not found' });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Get One Game by Id ***
    async getOneById(id: number): Promise<GameEntity> {
        try {
            const game = await this.gameRepository.findOne({ where: { id } });
            if (game) return game;
            throw new NotFoundException({ message: 'game not found' });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Create One Game ***
    async createOne(gameDTO: GameDTO): Promise<GameEntity | { message: string }> {
        // Validate Exists
        const exists = await this.gameRepository.findOne({ where: { gameTitle: gameDTO.gameTitle } });
        if (exists) throw new NotFoundException({ message: `Game: ${exists.gameTitle}. Already exists` });

        try {
            const game = this.gameRepository.create(gameDTO) // Create the Object
            await this.gameRepository.save(game); // Saving the object
            return ({ message: `Game: ${game.gameTitle}. Was successfully created` });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Update One Game ***
    async updateOneGame(id: number, gameDTO: GameDTO): Promise<GameEntity | { message: string }> {
        // Validate Exists
        const exists = await this.gameRepository.findOne({ where: { id } });
        if (!exists) throw new NotFoundException({ message: 'User not found' });
        // Validate Unique - Email. exists and user MUST be SIMILAR
        const user = await this.gameRepository.findOne({ where: { gameTitle: gameDTO.gameTitle } });
        if (user && user.id !== exists.id) throw new NotFoundException({ message: `Game title: ${user.gameTitle}. Already exists` });

        try {
            this.gameRepository.merge(exists, gameDTO); // Update the Object
            await this.gameRepository.save(exists);
            return ({ message: `Game: ${exists.gameTitle}. Was successfully updated` });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Delete One Game ***
    async deleteOneGame(id: number): Promise<GameEntity | { message: string }> {
        // Validate Exists
        const exists = await this.gameRepository.findOne({ where: { id } });
        if (!exists) throw new NotFoundException({ message: `Game not found` });

        try {
            await this.gameRepository.remove(exists); // Deleting Object
            return ({message: `Game: ${exists.gameTitle}. Was successfully deleted`});
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
}

