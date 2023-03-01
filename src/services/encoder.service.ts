import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt'; // IMPORTANT

@Injectable()
export class EncoderService {

    //*** Encrypt Password ***
    async encryptPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(10); // By default is 10
        return await bcrypt.hash(password, salt);
    }
    //*** To Compare Password ***
    async comparePassword(password: string, userPassword: string): Promise<boolean> {
        return await bcrypt.compare(password, userPassword);
    }
    
}
