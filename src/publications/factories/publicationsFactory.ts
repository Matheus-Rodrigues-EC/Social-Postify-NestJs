import { PrismaService } from "../../prisma/prisma.service";
import { publicationsFactoryEntity } from "./publicationsFactoryEntity";

export async function createPublication(prisma: PrismaService, mediaId: number, postId: number){
    const publication = new publicationsFactoryEntity(mediaId, postId, "2024-05-22");

    return await prisma.publication.create({
        data: {
            mediaId: publication.mediaId,
            postId: publication.postId,
            date: publication.date
        }
    })
}

export async function readPublications(prisma: PrismaService){
    return await prisma.publication.findMany({});
};

export async function readPublicationId(prisma: PrismaService, id: number){
    return await prisma.publication.findUnique({where: {id: id}});
};

export async function updatePublicationId(prisma: PrismaService, id: number, mediaId: number, postId: number){
    const updatePublication = new publicationsFactoryEntity(mediaId, postId, "2025-05-22")

    return await prisma.publication.update({
        where: {
            id: id
        }, 
        data: {
            mediaId: updatePublication.mediaId,
            postId: updatePublication.postId,
            date: updatePublication.date
        }
    })
};

export async function deletePublicationId(prisma: PrismaService, id: number){
    return await prisma.publication.delete({where: {id: id}});
}