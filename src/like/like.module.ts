import { forwardRef, Module } from '@nestjs/common';
import { LikeController } from './like.controller';
import { LikeService } from './like.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Post } from 'src/post/post.entity';
import { PostModule } from 'src/post/post.module';
import { UserModule } from 'src/user/user.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Like, Post]),
    forwardRef(() => PostModule), UserModule
  ],
  controllers: [LikeController],
  providers: [LikeService],
  exports: [LikeService], 
})
export class LikeModule {}

