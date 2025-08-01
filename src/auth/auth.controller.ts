import { Body, Controller, Delete, ForbiddenException, Get, Post,Param,  Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { CreateLoginDto } from 'src/user/dto/create-login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { RoleGuard } from 'src/guards/role/role.guard';
import { Role } from 'src/guards/role/roles.enum';
import { Roles } from 'src/guards/role/roles.decorator';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto) {
        return this.authService.register(createUserDto);
    }

    @Post('login')
    async login(@Body() createLoginDto: CreateLoginDto) {
        return this.authService.login(createLoginDto);
    }

    @Get('profile')
    @UseGuards(AuthGuard)
    getProfile(@Request() req) {
        return this.authService.getProfile(req.user.email);
    }

    @Get('all-users')
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    async getAllUsers() {
        return this.authService.getAllUsers();
    }

    // @Delete('deleteuser')
    @Delete('delete-user')
    @UseGuards(RoleGuard)
    @Roles(Role.Admin)
    async deleteUser(@Body() deleteUserDto: DeleteUserDto) {
        const isValidUser = this.authService.getProfile(deleteUserDto.email);
        if((await isValidUser).role === 'admin'){
            throw new ForbiddenException("You can't delete admin");
        }
        console.log("isvaild user is: ", isValidUser);
        return this.authService.deleteUser(deleteUserDto);
    }

    @Get('user-by-name/:name')
    @UseGuards(RoleGuard) 
    @Roles(Role.Admin)
    @Roles(Role.User)
    async getUserByName(@Param('name') name: string) {
        return this.authService.findUserByName(name);
    }



    
}
