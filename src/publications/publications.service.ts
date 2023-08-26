import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PublicationsRepository } from './publications.repository';
import { createPublicationDTO } from './dtos/publicationDTO';
import { PostsRepository } from '../posts/posts.repository';
import { MediasRepository } from '../medias/medias.repository';

@Injectable()
export class PublicationsService {
    constructor(
        private readonly publicationsRepository: PublicationsRepository,
        private readonly postdRepository: PostsRepository,
        private readonly mediasRepository: MediasRepository
    ) {}
    

    async createPublication(data: createPublicationDTO){
        if((!data.mediaId) || (!data.postId) || (!data.date)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const existsMedia = await this.mediasRepository.readMediaId(data.mediaId)
        if(!existsMedia) throw new HttpException('Media Not Found', HttpStatus.NOT_FOUND);
        const existsPost = await this.postdRepository.readPostId(data.postId);
        if(!existsPost) throw new HttpException('Post Not Found', HttpStatus.NOT_FOUND);
        await this.publicationsRepository.createPublication(data);
    }

    async readPublications(query?: {published?: boolean, after?: string}){
        const publications = await this.publicationsRepository.readPublications();
        if(query.published && query.after){
            const publisheds = [] 
            publications.map((pub) => {
                if(Date.parse(pub.date) > Date.parse(query.after)){
                    publisheds.push(pub);
                }
            })
            return publisheds;
        }
        return publications;
    }

    async readPublicationId(id: number){
        const publication = await this.publicationsRepository.readPublicationId(Number(id));
        if(!publication) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        return publication;
    }

    async updatePublication(id: number, data: createPublicationDTO){

        const exists = await this.publicationsRepository.readPublicationId(id);
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        const existsMedia = await this.mediasRepository.readMediaId(data.mediaId);
        if(!existsMedia) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        const existsPost = await this.postdRepository.readPostId(data.postId);
        if(!existsPost) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);
        
        if(Date.parse(exists.date) < Date.now()) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);
        if(Date.parse(data.date) < Date.now()) throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);


        const publication = await this.publicationsRepository.updatePublicationId(id, data);
        return publication;
    }

    async deletePublicationId(id: number){
        const exists = await this.publicationsRepository.readPublicationId(id);
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

        return this.publicationsRepository.deletePublicationId(Number(id));
    }
}
