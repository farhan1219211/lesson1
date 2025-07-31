import { Body, Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateLoginDto } from 'src/user/dto/create-login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService){}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto){
        return this.authService.login(createLoginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req){
        return this.authService.getProfile(req.user.email);
        // return req.user;
     }

}

