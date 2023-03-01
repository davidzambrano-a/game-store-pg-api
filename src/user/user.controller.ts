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
import { Roles } from 'src/auth/enums/roles.enum';
import { RoleDecorator } from 'src/decorators/role.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { UserService } from 'src/services/user.service';
import { CreateUserDTO } from './dto/create.user.dto';
import { UpdateUserDTO } from './dto/update.user.dto';
import { UserEntity } from './entities/user.entity';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}

    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleDecorator(Roles.ADMIN, Roles.MODERATOR)
    @Get('/')
    async getAll() {
        return await this.userService.getAllUsers();
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleDecorator(Roles.ADMIN, Roles.MODERATOR)
    @Get('/:id')
    async getOne(@Param('id') id: number): Promise<UserEntity | { message: string }> {
        return await this.userService.getOneById(id);
    }
    @UsePipes(new ValidationPipe())
    @Post('/register')
    async registerOne(@Body() createUserDTO: CreateUserDTO): Promise<UserEntity | { message: string }> {
        return await this.userService.registerOne(createUserDTO);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleDecorator(Roles.ADMIN, Roles.MODERATOR)
    @UsePipes(new ValidationPipe())
    @Put('/update/:id')
    async updateOne(@Param('id') id: number, @Body() updateUserDTO: UpdateUserDTO) {
        return await this.userService.updateOneUser(id, updateUserDTO);
    }
    @UseGuards(JwtAuthGuard, RolesGuard)
    @RoleDecorator(Roles.ADMIN)
    @Delete('/delete/:id')
    async deleteOneUser(@Param('id') id: number): Promise<UserEntity | { message: string }> {
        return await this.userService.deleteOneUser(id);
    }
}
