import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { MediasRepository } from './medias.repository';
import { createMediaDTO } from './dtos/mediaDTO';

@Injectable()
export class MediasService {
    constructor(private readonly mediasRepository: MediasRepository) {}

    async createMedia(data: createMediaDTO){
        if((!data.title) || (!data.username)) throw new HttpException('Bad Request', HttpStatus.BAD_REQUEST);
        const media = await this.mediasRepository.readMedia(data);
        if(media) throw new HttpException('Conflict', HttpStatus.CONFLICT);
        await this.mediasRepository.createMedia(data);
    }

    async readMedias(){
        const medias = await this.mediasRepository.readMedias();
        return medias;
    }

    async readMediaId(id: number){
        const media = await this.mediasRepository.readMediaId(Number(id));
        if(!media) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)
        return media;
    }

    async updateMediaId(id: number, data: createMediaDTO){
        const exists = await this.mediasRepository.readMediaId(Number(id));
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        const verifyConflict = await this.mediasRepository.readMedia(data);
        if(verifyConflict) throw new HttpException('Conflict', HttpStatus.CONFLICT);

        const media = await this.mediasRepository.updateMediaId(Number(id), data);
        return media;
    }

    async deleteMediaId(id: number){
        const exists = await this.mediasRepository.readMediaId(Number(id));
        if(!exists) throw new HttpException('Not Found', HttpStatus.NOT_FOUND)

        return await this.mediasRepository.deleteMediaId(Number(id));
    }
}
