import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { ExtractJwt, Strategy } from "passport-jwt";
import { JWT_KEY } from "src/dbConfig/dbConsts";
import { JwtPayload } from "src/interfaces/jwtPayload";
import { UserEntity } from "src/user/entities/user.entity";
import { Repository } from "typeorm";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    constructor(
        @InjectRepository(UserEntity)
        private authRepository: Repository<UserEntity>,
        private configService: ConfigService, // Come from: @nestjs/config
    ) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false, // JWT_KEY. It’s created in .env file
            secretOrKey: configService.get(JWT_KEY),
        });
    }
    // Method to Validate DATA type to return in the TOKEN
    async validate(payload: JwtPayload): Promise<UserEntity> {
        const { email } = payload;
        const user = await this.authRepository.findOne({ where: { email } });
        if (!user) throw new UnauthorizedException({ message: 'Please, check your credentials' });
        // console.log('From Strategy: ',user);
        return user; // In this case ALWAYS return: payload
    }
}
