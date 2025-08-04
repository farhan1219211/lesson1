import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Comments } from './comments.entity';
import { Post } from 'src/post/post.entity';
import { User } from 'src/user/user.entity';
import { CreateCommentDto } from './dto/create-comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(Comments) private commentRepository: Repository<Comments>,
    @InjectRepository(Post) private postRepository: Repository<Post>,
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async createComment(postId: number, userId: number, dto: CreateCommentDto) {
    const post = await this.postRepository.findOne({ where: { post_id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    const user = await this.userRepository.findOne({ where: { user_id: userId } });
    if (!user) throw new NotFoundException('User not found');

    const comment = this.commentRepository.create({
      content: dto.content,
      post,
      author: user,
    });

    return this.commentRepository.save(comment);
  }

  async getCommentsByPost(postId: number) {
    const post = await this.postRepository.findOne({ where: { post_id: postId } });
    if (!post) throw new NotFoundException('Post not found');

    return this.commentRepository.find({
      where: { post: { post_id: postId } },
      relations: ['author'],
      order: { comment_id: 'ASC' },
    });
  }
}
