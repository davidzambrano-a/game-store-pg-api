import {
    Body,
    Controller,
    Patch,
    Post,
    UseGuards,
    UsePipes,
    ValidationPipe
} from '@nestjs/common';
import { GetUser } from 'src/decorators/get-user.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { AuthService } from 'src/services/auth.service';
import { UserEntity } from 'src/user/entities/user.entity';
import { ChangePasswordDTO } from './dto/change-password.dto';
import { LoginDTO } from './dto/login.dto';
import { TokenDTO } from './dto/token.dto';

@Controller('auth')
export class AuthController {

    constructor(private readonly authService: AuthService) { }

    //*** LOG-IN ***
    @UsePipes(new ValidationPipe())
    @Post('/login')
    async login(@Body() loginDTO: LoginDTO): Promise<{ token: string }> {
        return await this.authService.loginUser(loginDTO);
    }
    //*** Change Password ***
    @Patch('/change-password')
    @UseGuards(JwtAuthGuard) // Protect this endpoint with LOG-IN     // Contain all Register DATA
    changePassword(@Body() changePasswordDTO: ChangePasswordDTO, @GetUser() payload: UserEntity): Promise<void> {
        return this.authService.changePassword(changePasswordDTO, payload)
    }
    // *** REFRESH TOKEN ***
    @Post('/refresh')
    async refresh(@Body() tokenDTO: TokenDTO) {
        return this.authService.refreshToken(tokenDTO);
    }

}
