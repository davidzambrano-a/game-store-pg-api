import { Matches } from "class-validator";

export class ChangePasswordDTO {

    // @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).(?!.*\s).{8,15}$/, {
    //     message: 'Password is too weak, or contain blank spaces.'})
    oldPassword: string; // Is not necessary to validate because, It's created on DB

    @Matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).(?!.*\s).{8,15}$/, {
        message: 'Password is too weak, or contain blank spaces.'})
    newPassword: string;
}
