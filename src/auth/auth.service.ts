import {
    BadRequestException,
    ForbiddenException,
    Injectable,
    Inject,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';
import { CreateLoginDto } from 'src/user/dto/create-login.dto';
import { DeleteUserDto } from 'src/user/dto/delete-user.dto';
import { Role } from 'src/guards/role/roles.enum';

@Injectable()
export class AuthService {
    constructor(
        private readonly jwtService: JwtService,
        @Inject(UserService)
        private readonly userService: UserService,
    ) {}

    async register(createUserDto: CreateUserDto) {
        return await this.userService.register(createUserDto);
    }

    async login(createLoginDto: CreateLoginDto) {
        const isLogin = await this.userService.login(createLoginDto);
        if (isLogin) {
            const user = await this.userService.getUserByEmail(createLoginDto.email);
            const token = this.jwtService.sign({
                id: user.user_id,
                email: user.email,
                role: user.role,
            });
            return { message: 'Token Generated', token };
        }
    }

    async getProfile(email: string) {
        return this.userService.profile(email);
    }

    async getAllUsers() {
        return await this.userService.getAllUsers();
    }

    async deleteUser(deleteUserDto: DeleteUserDto) {
        return await this.userService.deleteUser(deleteUserDto.email);
    }

    async findUserByName(name: string){
          return this.userService.findUserByName(name);
    }


}
