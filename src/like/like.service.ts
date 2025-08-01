import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/post/post.entity";
import { User } from "src/user/user.entity";
import {  Repository } from "typeorm";
import { Like } from "./like.entity";

@Injectable()
export class LikeService {
  constructor(
    @InjectRepository(Like)
    private likeRepository: Repository<Like>,

    @InjectRepository(Post)
    private postRepository: Repository<Post>,

    @InjectRepository(User) 
    private userRepository: Repository<User>
  ) {}

async likePost(postId: number, userPayload: any): Promise<string> {
    console.log("Post id I'm getting in my function is:", postId);

    const post = await this.postRepository.findOne({
        where: { post_id: postId },
    });

    console.log("The post I get is:", post);

    if (!post) {
        throw new NotFoundException('Post not found');
    }


    const user = await this.userRepository.findOne({
        where: { user_id: userPayload.id },
    });

    if (!user) {
        throw new NotFoundException('User not found');
    }

    const alreadyLiked = await this.likeRepository.findOne({
        where: {
        post: { post_id: postId },
        likedBy: { user_id: user.user_id},
        },
    });

    if (alreadyLiked) {
        throw new BadRequestException('You have already liked this post');
    }

    const like = new Like();
    like.post = post;
    like.likedBy = user; 

    console.log("Value of like is:", like);

    await this.likeRepository.save(like);
    return 'Post liked successfully';
}

  async getLikedPostsByUser(userId: number): Promise<Post[]> {
    const likes = await this.likeRepository.find({
      where: { likedBy: { user_id: userId } },
      relations: ['post'],
    });

    return likes.map(like => like.post);
  }

  async getMyPostsWithStats(userId: number) {
    const posts = await this.postRepository.find({
        where: { author: { user_id: userId } },
        relations: ['likes', 'comments'],
    });

    return posts.map((post) => ({
        id: post.post_id,
        title: post.title,
        content: post.content,
        likesCount: post.likes?.length || 0,
        commentsCount: post.comments?.length || 0,
    }));
}

}
