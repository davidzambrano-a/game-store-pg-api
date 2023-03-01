import { IsDateString, IsEmail, IsEnum, Length, Matches } from "class-validator";
import { Roles } from "src/auth/enums/roles.enum";

export class UpdateUserDTO {

    @Length(2, 20, { message: 'Full name. Must be over that 5 or equal 20 chars' })
    @Matches(/^[a-zA-Z]{2,}(?: [A-Z][a-zA-Z]*){0,2}$/, { message: 'Full name cannot contain blank space' })
    readonly fullName: string;

    @Length(2, 20, { message: 'User name. Must be over that 5 or equal 20 chars' })
    @Matches(/^[a-z]{2,}(?:[a-z]*){0,5}$/, { message: 'User name is wrong' })
    readonly userName: string;

    @IsEmail(undefined, { message: 'Email is wrong' })
    readonly email: string;

    @IsDateString(undefined, { message: 'Date is wrong' })
    readonly createdAt: Date;

    // Roles. Means. This enum is type Roles (create in the enum).
    @IsEnum(Roles, { message: 'Role has to be: admin, moderator, or user' })
    roleName: Roles = Roles.USER; //  = Roles.USER. Assign Role user by default

}
