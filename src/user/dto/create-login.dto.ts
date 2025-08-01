import { IsEmail, IsNotEmpty, IsString, MinLength } from "class-validator";
import { Transform } from "class-transformer";


export class CreateLoginDto{
        @IsNotEmpty()
        @IsEmail()
        @Transform(({ value }) => value.toLowerCase())
        email: string
    
        @IsNotEmpty()
        @IsString()
        @MinLength(8)
        password: string
}