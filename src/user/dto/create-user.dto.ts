import { IsEmail, IsEnum, IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export enum UserRole {
    ADMIN = "admin",
    USER = "user",
}

export enum UserStatus {
    ACTIVE = "active",
    INACTIVE = "inactive"
}

export class CreateUserDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(20)
    name: string

    @IsNotEmpty()
    @IsEmail()
    @Transform(({ value }) => value.toLowerCase())
    email: string

    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string
    
    @IsEnum(UserRole)
    role: UserRole;

    @IsEnum(UserStatus)
    status: UserStatus

}