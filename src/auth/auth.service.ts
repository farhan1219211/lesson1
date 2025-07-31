import { BadRequestException, Get, Inject, Injectable, Request, UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserService } from 'src/user/user.service';
import { CreateLoginDto } from 'src/user/dto/create-login.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';


@Injectable()
export class AuthService {
     constructor(private readonly jwtService: JwtService){}
     @Inject(UserService)
     private readonly userService: UserService;

    async register(createUserDto: CreateUserDto){
        return await this.userService.register(createUserDto);
     }

     async login(createloginDto: CreateLoginDto){
          const isLogin = await this.userService.login(createloginDto);
          if(isLogin){
               const user_id = this.userService.getUserId(createloginDto.email);
               const token = this.jwtService.sign({ id: user_id, email: createloginDto.email });
                    return { message: 'Token Generated', token };

          }
     }

     async getProfile(email: string){
          return this.userService.profile(email);
     }




}
