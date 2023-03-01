import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDTO } from 'src/user/dto/create.user.dto';
import { UpdateUserDTO } from 'src/user/dto/update.user.dto';
import { UserEntity } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { EncoderService } from './encoder.service';

@Injectable()
export class UserService {

    // Create a Constructor. To be able inject properties
    constructor(
        @InjectRepository(UserEntity) private userRepository: Repository<UserEntity>,
        private encoderService: EncoderService,
    ) { }

    // *** GET ALL USERS ***
    async getAllUsers(): Promise<UserEntity[]> {
        try {
            const list = await this.userRepository.find();
            if (list.length) return list;
            throw new NotFoundException({ message: 'Users not found' });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** GET ONE USER ***
    async getOneById(id: number): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({ where: { id } });
            if (user) return user;
            throw new NotFoundException({ message: 'User not found' });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Post One User ***
    async registerOne(createAuthDTO: CreateUserDTO): Promise<UserEntity | { message: string }> {
        // Validate Exits
        const { fullName, userName, email, password, createdAt, roleName } = createAuthDTO;
        const exists = await this.userRepository.findOne({ where: { email } });
        if (exists) throw new NotFoundException({ message: `Email: ${exists.email}. Already exists` });

        try {
            const hashPassword = await this.encoderService.encryptPassword(password);
            const user = this.userRepository.create({ fullName, userName, email, password: hashPassword, createdAt, roleName });
            await this.userRepository.save(user); // Saving the Object
            // console.log(user);
            return ({ message: `User: ${user.fullName}. Was successfully created` });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
        // NOTE: The Role. We pass it on Request, or it's set by Default (user).
    }
    // *** Update One USER ***
    async updateOneUser(id: number, updateAuthDTO: UpdateUserDTO): Promise<UserEntity | { message: string }> {
        // Validate Exists
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException({ message: 'User to update not found' });
        // Validate Unique
        const exists = await this.userRepository.findOne({ where: { email: updateAuthDTO.email } });
        if (exists && exists.id !== user.id) throw new NotFoundException({
            message: `Email: ${exists.email}. Already exists`
        });

        try {
            this.userRepository.merge(user, updateAuthDTO); // Update the Object
            await this.userRepository.save(user); // Saving the Object
            return ({ message: `User: ${user.fullName}. Was successfully updated` });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }
    // *** Delete One Admin USER ***
    async deleteOneUser(id: number): Promise<UserEntity | { message: string }> {
        // Validate Exists
        const user = await this.userRepository.findOne({ where: { id } });
        if (!user) throw new NotFoundException({ message: 'User not found' });
        try {
            await this.userRepository.delete(user); // Deleting the Object
            return ({ message: `User: ${user.fullName}. Was successfully deleted` });
        } catch (err) {
            throw new BadRequestException(err.response);
        }
    }

}
