import { Injectable, NotFoundException } from '@nestjs/common';
import { Post } from './post.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { CreatePostDto } from './dto/create-post.dto';
import { User } from 'src/user/user.entity';
import { Like } from 'src/like/like.entity';

@Injectable()
export class PostService {
    constructor(@InjectRepository(Post) private postRepository: Repository<Post>,
     @InjectRepository(User) private userRepository: Repository<User>,
     @InjectRepository(Like) private likeRepository: Repository<Like>){}

    async createPost(createPostDto: CreatePostDto, userId: number) {
        const user = await this.userRepository.findOneBy({ user_id: userId });
        if (!user) throw new NotFoundException('User not found');

        const post = this.postRepository.create({
            ...createPostDto,
            author: user,
        });

        return await this.postRepository.save(post);
    }

    async searchPostsByTitle(title: string) {
        return await this.postRepository.find({
            where: {
            title: ILike(`%${title}%`)
            },
        // relations: ['author']//, 'comments', 'likes']
            });
    }

    async getPostsLikedByUser(userId: number): Promise<Post[]> {
        const likes = await this.likeRepository.find({
            where: { likedBy: { user_id: userId } },
            relations: ['post'],
        });

        const likedPosts = likes.map(like => like.post);
        return likedPosts;
    }


}
