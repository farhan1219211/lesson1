 import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostModule } from './post/post.module';
import { CommentsModule } from './comments/comments.module';
import { LikeModule } from './like/like.module';
import { AuthModule } from './auth/auth.module';
import { User } from './user/user.entity';
import { Post } from './post/post.entity';
import { Comments } from './comments/comments.entity';
import { Like } from './like/like.entity';

@Module({
  imports: [ConfigModule.forRoot(), 
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      autoLoadEntities: true,
      synchronize: true,
      entities: [User, Post, Comments, Like]
    }),
    UserModule,
    PostModule,
    CommentsModule,
    LikeModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule{
 
  }
