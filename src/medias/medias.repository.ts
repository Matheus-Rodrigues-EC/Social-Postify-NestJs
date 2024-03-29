import { Injectable } from '@nestjs/common';
import { createMediaDTO } from './dtos/mediaDTO';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class MediasRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createMedia(data: createMediaDTO){
        return await this.prisma.media.create({data: data})
    }

    async readMedia(data: createMediaDTO){
        const media = await this.prisma.media.findFirst({
            where: {
                title: data.title, 
                username: data.username
            }
        });
        return media;
    }

    async readMedias(){
        const medias = await this.prisma.media.findMany({});
        return medias;
    }

    async readMediaId(id: number){
        const media = await this.prisma.media.findFirst({ where: {id: Number(id)}});
        return media;
    }

    async updateMediaId(id: number, data: createMediaDTO){
        return await this.prisma.media.update({ 
            where: {
                id: Number(id)
            }, 
            data: {
                title: data.title, 
                username: data.username
            }
        })
    }

    async deleteMediaId(id: number){
        return await this.prisma.media.delete({ where: {id: Number(id)}})
    }
}
