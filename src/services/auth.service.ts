import {
    BadRequestException,
    Injectable,
    UnauthorizedException
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { ChangePasswordDTO } from 'src/auth/dto/change-password.dto';
import { LoginDTO } from 'src/auth/dto/login.dto';
import { TokenDTO } from 'src/auth/dto/token.dto';
import { JwtPayload } from 'src/interfaces/jwtPayload';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { EncoderService } from './encoder.service';

@Injectable()
export class AuthService {

    constructor(
        @InjectRepository(UserEntity)
        private readonly authRepository: Repository<UserEntity>,
        private readonly encoderService: EncoderService,
        private readonly jwtService: JwtService, // Comes from: @nestjs/jwt
    ) { }

    // *** LOG-IN ***
    async loginUser(loginDTO: LoginDTO): Promise<{ token: string }> {
        // Validate Exists
        const { email, password } = loginDTO;
        const user = await this.authRepository.findOne({ where: { email } });
        if (!user) throw new BadRequestException({ message: 'User not found' });

        try {
            const passwordOK = await this.encoderService.comparePassword(password, user.password);
            if (!passwordOK) throw new UnauthorizedException({ message: 'Check your credentials' });
        } catch (err) {
            throw new BadRequestException(err.message);
        }
        // This payload: Is to send what we want to send in the TOKEN
        const payload: JwtPayload = {
            id: user.id,
            userName: user.userName,
            email: user.email,
            roles: user.roleName, // roles. From: JwtPayload | roleName: From: UserEntity
            // roles: user.roles.map(role => role.roleName as Roles)
        }
        const token = this.jwtService.sign(payload);
        return { token };
    }
    // *** CHANGE PASSWORD ***
    async changePassword(changePasswordDTO: ChangePasswordDTO, user: UserEntity): Promise<void> {
        try {
            const { oldPassword, newPassword } = changePasswordDTO;
            if (await this.encoderService.comparePassword(oldPassword, user.password)) {
                user.password = await this.encoderService.encryptPassword(newPassword);
                this.authRepository.save(user); // Save the new password encrypted
                // return ({ message: 'Password changed' }); // return a message from the Front-end
            } else {
                throw new BadRequestException('Old password does not match!');
            }
        } catch (err) {
            throw new BadRequestException(err.message);
        }
    }
    // *** REFRESH TOKEN. Video 16 of Login folder ***
    async refreshToken(tokenDTO: TokenDTO): Promise<unknown> { // jwtService. It's a JSON Service
        const user = await this.jwtService.decode(tokenDTO.token);
        const payload: JwtPayload = {
            id: user['id'],
            userName: user['userName'],
            email: user['email'],
            roles: user['roles']
        }
        const token = await this.jwtService.sign(payload);
        return { token };
    }

}
