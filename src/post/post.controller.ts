import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';
import { Roles } from 'src/guards/role/roles.decorator';
import { Role } from 'src/guards/role/roles.enum';
import { RoleGuard } from 'src/guards/role/role.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Post('create-post')
    @UseGuards(AuthGuard)
    @Roles(Role.User, Role.Admin)
    async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
        return this.postService.createPost(createPostDto, req.user.id);
    }

    @Get('search-post')
    @UseGuards(RoleGuard)
    @Roles(Role.Admin, Role.User)
    async searchPosts(@Query('title') title: string) {
    return this.postService.searchPostsByTitle(title);
    }

    @UseGuards(AuthGuard) 
    @Get('liked-by-me')
    async getLikedPosts(@Request() req) {
        const userId = req.user.id;
        return this.postService.getPostsLikedByUser(userId);
    }

    @UseGuards(AuthGuard)
    @Get('my-posts/stats')
    async getMyPostsWithStats(@Request() req) {
        const userId = req.user.id;
        return this.postService.getMyPostsWithStats(userId);
    }


}
