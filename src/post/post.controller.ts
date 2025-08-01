import { Body, Controller, Get, Post, Query, Request, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostDto } from './dto/create-post.dto';
import { AuthGuard } from 'src/guards/auth/auth.guard';

@Controller('post')
export class PostController {
    constructor(private readonly postService: PostService){}

    @Post()
    @UseGuards(AuthGuard)
    async createPost(@Body() createPostDto: CreatePostDto, @Request() req) {
        return this.postService.createPost(createPostDto, req.user.id);
    }

    @Get('search-post')
    async searchPosts(@Query('title') title: string) {
    return this.postService.searchPostsByTitle(title);
    }

    @UseGuards(AuthGuard) 
    @Get('liked-by-me')
    async getLikedPosts(@Request() req) {
        const userId = req.user.id;
        return this.postService.getPostsLikedByUser(userId);
    }


}
