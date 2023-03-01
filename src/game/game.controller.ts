import { 
    Body, 
    Controller, 
    Delete, 
    Get, 
    Param, 
    Post, 
    Put, 
    UseGuards, 
    UsePipes, 
    ValidationPipe 
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { GameService } from 'src/services/game.service';
import { GameDTO } from './dto/game.dto';
import { GameEntity } from './entities/game.entity';

@Controller('game')
export class GameController {

    constructor(private readonly gameService: GameService) { }

    // *** Get All ***
    @UseGuards(JwtAuthGuard)
    @Get('/')
    async getAll() {
        return await this.gameService.getAAllGames();
    }
    // *** Get One ***
    @UseGuards(JwtAuthGuard)
    @Get('/:id')
    async getOne(@Param('id') id: number): Promise<GameEntity | { message: string }> {
        return await this.gameService.getOneById(id);
    }
    // *** Post ***
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Post('/create')
    async createOne(@Body() gameDTO: GameDTO) {
        return await this.gameService.createOne(gameDTO);
    }
    // *** Put ***
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe())
    @Put('/update/:id')
    async updateOne(@Param('id') id: number, @Body() updateDTO: GameDTO) {
        return await this.gameService.updateOneGame(id, updateDTO);
    }
    // *** Delete ***
    @UseGuards(JwtAuthGuard)
    @Delete('/delete/:id')
    async deleteOneGame(@Param('id') id: number) {
        return await this.gameService.deleteOneGame(id);
    }

}
