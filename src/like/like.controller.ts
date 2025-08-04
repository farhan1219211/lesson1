import { Controller, Get, Param, Post, Request, UseGuards } from '@nestjs/common';
import { LikeService } from './like.service';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Role } from 'src/guards/role/roles.enum';
import { Roles } from 'src/guards/role/roles.decorator';


@Controller('like')
export class LikeController {
  constructor(private readonly likeService: LikeService) {}

    
  @UseGuards(AuthGuard)
  @Roles(Role.Admin, Role.User)
  @Post('id/:postId')
  async likePost(@Param('postId') postId: number, @Request() req) {
    const user = req.user;
    return this.likeService.likePost(postId, user);
  }


    @UseGuards(AuthGuard)
    @Get('liked-posts')
    async getLikedPosts(@Request() req) {
        const userId = req.user.id;
        return this.likeService.getLikedPostsByUser(userId);
  }

  @UseGuards(AuthGuard)
    @Get('my-posts-stats')
    async getMyPostsStats(@Request() req) {
        const userId = req.user.id;
    return this.likeService.getMyPostsWithStats(userId);
}

}
