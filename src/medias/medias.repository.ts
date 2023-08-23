import { Injectable } from '@nestjs/common';

@Injectable()
export class MediasRepository {
    constructor(private readonly respository: MediasRepository) { }

    async createMedia(){
        return null;
    }
}
