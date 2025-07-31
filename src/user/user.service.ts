import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { CreateLoginDto } from './dto/create-login.dto';


@Injectable()
export class UserService {

        // Constructor Call
        constructor(@InjectRepository(User) private userRepository: Repository<User>){}

        // Register User
        async register(createUserDto: CreateUserDto){
            const email = createUserDto.email;
            const userExists = await this.userRepository.findOneBy({email});

            if(userExists){
                throw new BadRequestException('User already exists');
            }

            const passwordHashed = await bcrypt.hash(createUserDto.password, 10);
            createUserDto.password = passwordHashed;
            const newUser = this.userRepository.create(createUserDto);

            await this.userRepository.save(newUser);
        return { message: 'User registered successfully' };

    }

    // Login User
    async login(createLoginDto: CreateLoginDto){
        const email = createLoginDto.email;
        const user = await this.userRepository.findOneBy({email});

        if(!user){
            throw new BadRequestException("Invaid Credentias");
        }

        const isValidPassword = await bcrypt.compare(createLoginDto.password, user.password);
        if(!isValidPassword){
            throw new BadRequestException("Wrong Password");
        }

        if(isValidPassword){return "Login Successfull"};
    }

    // Get User Id (Primary key from database)
    async getUserId(email: string){
        const user = await this.userRepository.findOneBy({email});
        if(!user){
            throw new BadRequestException("User not found");
        }
        return user.user_id;
    }

    // Get All Data of User
    async profile(email: string){
        const user = await this.userRepository.findOneBy({email});
        return {
            "name": user?.name,
            "id": user?.user_id,
            "email": user?.email,
            "role": user?.role,
            "status": user?.status
        }
    }

}
