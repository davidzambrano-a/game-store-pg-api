import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { Platform } from "../enums/platform.enum";
import { TypeGame } from "../enums/type.game";

@Entity({ name: 'games' })
export class GameEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'game_title', type: 'varchar', length: 70, nullable: false })
    gameTitle: string;

    @Column({ name: 'type_game', type: 'varchar', length: 20, nullable: false })
    typeGame: TypeGame; // Enum

    @Column({ name: 'game_image', type: 'varchar', length: 150, nullable: false })
    gameImage: string;

    @Column({ type: 'varchar', length: 150, nullable: false })
    platform: Platform; // Enum

    @Column({ name: 'release_date', nullable: false })
    releaseDate: Date;
    
    @Column({ type: 'varchar', length: 150, nullable: false })
    description: string;

}
