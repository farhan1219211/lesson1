import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { IsEmail } from "class-validator";

// Two possible roles (admin, user)
export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

// Two possible status (active, inactive)
export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

@Entity()
export class User{

    @PrimaryGeneratedColumn()
    user_id: number

    @Column()
    name: string

    @Column()
    @IsEmail()
    email: string

    @Column()
    password: string

    @Column({type: "enum", enum: UserRole})
    role: UserRole;

    @Column({type: "enum", enum: UserStatus})
    status: UserStatus;
}