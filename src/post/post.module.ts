import { forwardRef, Module } from '@nestjs/common';
import { PostService } from './post.service';
import { PostController } from './post.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './post.entity';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { LikeModule } from 'src/like/like.module';
import { Like } from 'src/like/like.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Post, Like]),
    UserModule,
    forwardRef(() => LikeModule),
  ],
  providers: [PostService],
  controllers: [PostController],
})
export class PostModule {}

