import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PostsRepository } from './posts.repository';
import { createPostDTO } from './dtos/postDTO';

@Injectable()
export class PostsService {
    constructor(private readonly postsRepository: PostsRepository) {}

    async createPost(data: createPostDTO){
        if((!data.title) || (!data.text)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        await this.postsRepository.createPost(data);
    }

    async readPosts(){
        const posts = await this.postsRepository.readPosts();
        return posts;
    }

    async readPostId(id: number){
        const post = await this.postsRepository.readPostId(Number(id));
        if(!post) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return post;
    }

    async updatePostId(id: number, data: createPostDTO){
        if((!data.title) || (!data.text)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);

        const exists = await this.postsRepository.readPostId(Number(id));
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        const post = await this.postsRepository.updatePostId(Number(id), data);
        return post;
    }

    async deletePostId(id: number){
        const exists = await this.postsRepository.readPostId(Number(id));
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return await this.postsRepository.deletePostId(Number(id));
    }
}
