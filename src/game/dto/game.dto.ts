import { IsDateString, IsEnum, IsUrl, Length, Matches } from "class-validator";
import { Platform } from "../enums/platform.enum";
import { TypeGame } from "../enums/type.game";

export class GameDTO {

    @Matches(/^[A-Z][a-zA-Z][a-zA-Z0-9\ \']{3,21}$/, { message: 'The name is wrong' })
    readonly gameTitle: string;

    @IsEnum(TypeGame, { message: 'Type game is wrong' })
    readonly typeGame: TypeGame ;

    @IsUrl(undefined, { message: 'Image is wrong' })
    readonly gameImage: string;
    
    @IsEnum(Platform, { message: 'Platform is wrong' })
    readonly platform: Platform;

    @IsDateString(undefined, { message: 'Date is wrong' })
    readonly releaseDate: Date;

    @Matches(/^[A-Z][a-zA-Z][a-zA-Z0-9~@#\^\$&\*\(\)-_\+=\[\]\{\}\|\\,\.\?\s]*/, { message: 'Description. Is wrong' }) // Start with Upper case
    @Length(5, 150, { message: 'Description is wrong' })
    readonly description: string;

}
