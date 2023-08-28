import { Controller, Body, Post, Get, Patch, Delete, HttpCode, Param } from '@nestjs/common';
import { PostsService } from './posts.service';
import { createPostDTO } from './dtos/postDTO';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) {}

    @Get('/health')
    @HttpCode(200)
    getHealth() {
        return this.postsService.getHealthPosts();
    }
    

    @Post('/')
    @HttpCode(201)
    createPost(@Body() body: createPostDTO){
        return this.postsService.createPost(body);
    }

    @Get('/')
    @HttpCode(200)
    readPosts(){
        return this.postsService.readPosts();
    }

    @Get(':id')
    @HttpCode(200)
    readPost(@Param('id') id: number){
        return this.postsService.readPostId(Number(id))
    }

    @Patch(':id')
    @HttpCode(202)
    updatePostId(@Param("id") id: number, @Body() body: createPostDTO){
        return this.postsService.updatePostId(id, body);
    }

    @Delete(':id')
    @HttpCode(204)
    deletePostId(@Param("id") id: number){
        return this.postsService.deletePostId(Number(id));
    }
}
