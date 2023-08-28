import { PrismaService } from "../../prisma/prisma.service";
import { mediasFactoryEntity } from "./mediasFactoryEntity";
import { faker } from '@faker-js/faker';

export async function createMedia(prisma: PrismaService){
    const media = new mediasFactoryEntity(
        faker.company.name(),
        faker.lorem.sentence(10)
    );

    return await prisma.media.create({
        data:{
            title: media.title,
            username: media.username
        }
    });
}

export async function readMedia(prisma: PrismaService){
    return await prisma.media.findMany({});
}

export async function readMediaId(prisma: PrismaService, id: number){
    return await prisma.media.findUnique({where: {id: id}});
}

export async function updateMediaId(prisma: PrismaService, id: number){
    const updateMedia = new mediasFactoryEntity(
        faker.lorem.sentence(),
        faker.lorem.sentence(9)
    );

    return await prisma.media.update({
        where: {
            id: id
        },
        data: {
            title: updateMedia.title,
            username: updateMedia.username
        }
    });
}

export async function deleteMediaId(prisma: PrismaService, id: number){
    return await prisma.media.delete({where: {id: id}});
}