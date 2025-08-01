import { IsInt, IsNotEmpty, IsString, isString, MaxLength } from "class-validator";
import { User } from "src/user/user.entity";
import { PrimaryGeneratedColumn } from "typeorm";

export class CreatePostDto{
    @IsString()
    @IsNotEmpty()
    @MaxLength(50)
    title: string


    @IsString()
    @IsNotEmpty()
    content: string

}

