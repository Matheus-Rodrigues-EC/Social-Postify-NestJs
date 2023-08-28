import { PrismaService } from "../../prisma/prisma.service";
import { postsFactoryEntity } from "./postsFactoryEntity";
import { faker } from '@faker-js/faker';

export async function createPost(prisma: PrismaService){
    const post = new postsFactoryEntity(
        faker.company.name(),
        faker.lorem.sentence(10),
        faker.image.urlLoremFlickr()
    )

    return await prisma.post.create({
        data: {
            title: post.title,
            text: post.text,
            image: post.image
        }
    })
}

export async function readPosts(prisma: PrismaService){
    return await prisma.post.findMany({});
};

export async function readPostId(prisma: PrismaService, id: number){
    return await prisma.post.findUnique({where: {id: id}});
};

export async function updatePostId(prisma: PrismaService, id: number){
    const updatePost = new postsFactoryEntity(
        faker.company.name(),
        faker.lorem.sentence(9),
        faker.image.urlLoremFlickr()
    )

    return await prisma.post.update({
        where: {
            id: id
        }, 
        data: {
            title: updatePost.title,
            text: updatePost.text,
            image: updatePost.image
        }
    })
};

export async function deletePostId(prisma: PrismaService, id: number){
    return await prisma.post.delete({where: {id: id}});
}