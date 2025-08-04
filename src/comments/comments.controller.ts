import { Body, Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { CommentsService } from './comments.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { CreateCommentDto } from './dto/create-comment.dto';

@Controller('comments')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @UseGuards(AuthGuard)
  @Post(':postId')
  async createComment(
    @Param('postId') postId: number,
    @Request() req,
    @Body() dto: CreateCommentDto,
  ) {
    const userId = req.user.id;
    return this.commentsService.createComment(postId, userId, dto);
  }

  @Get('post/:postId')
  async getCommentsByPost(@Param('postId') postId: number) {
    return this.commentsService.getCommentsByPost(postId);
  }
}
