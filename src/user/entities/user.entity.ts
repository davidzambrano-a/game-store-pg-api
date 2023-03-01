import { Roles } from "src/auth/enums/roles.enum";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'users' }) // The Table name
export class UserEntity { // The Entity name
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ name: 'full_name', type: 'varchar', length: 70, nullable: false })
    fullName: string;

    @Column({ name: 'user_name', type: 'varchar', length: 70, nullable: false })
    userName: string;

    @Column({ type: 'varchar', nullable: false })
    email: string;

    @Column({ type: "varchar", length: 100, nullable: false, select: true })
    password!: string; // select: true. To avoid getting an Error. When we work with TOKEN
    // select: false. To avoid showing the Password
    // !. To avoid send this value in update method

    @Column({ name: 'created_at', nullable: false })
    createdAt: Date;

    @Column({ type: 'enum', enum: Roles, default: Roles.USER })
    roleName: Roles = Roles.USER; // type: 'enum', enum: Roles. Validate it's ENUM
// To set the role as Default:  roleName: Roles = Roles.USER
}
