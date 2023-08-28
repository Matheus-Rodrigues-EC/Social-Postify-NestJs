import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import * as request from 'supertest';
import * as publicationFactory from './factories/publicationsFactory';
import * as postFactory from '../posts/factories/postsFactory';
import * as mediaFactory from '../medias/factories/mediasFactory';


describe('PublicationsController', () => {
  let app: INestApplication;
  let prisma: PrismaService;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule, PrismaModule]
    })

      .overrideProvider(PrismaService)
      .useValue(prisma)
      .compile();

    app = moduleFixture.createNestApplication();
    // app.useGlobalPipes(new ValidationPipe())
    prisma = await moduleFixture.resolve(PrismaService);
    await prisma.publication.deleteMany();
    await prisma.media.deleteMany();
    await prisma.post.deleteMany();
    
    await app.init();
  });

  it('POST /publications => Should create a new Publication and return 200 status code', async () => {
    const media = await mediaFactory.createMedia(prisma);
    const post = await postFactory.createPost(prisma);
    const publication = await publicationFactory.createPublication(prisma, media.id, post.id);
    const response = await request(app.getHttpServer())
      .get(`/publications/${publication.id}`);
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.mediaId).toBe(publication.mediaId);
    expect(response.body.postId).toBe(publication.postId);
    expect(response.body.date).toBe(publication.date);

    const createdPublication = await publicationFactory.readPublicationId(prisma, publication.id);
    expect(createdPublication).not.toBe(null);
  });

  it('GET /publications => Should return status code 200 and a list publications', async () => {
    const media = await mediaFactory.createMedia(prisma);
    const post = await postFactory.createPost(prisma);
    const createPublication = await publicationFactory.createPublication(prisma, media.id, post.id);

    const response = await request(app.getHttpServer())
      .get('/publications');
    
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual([
      {
        id: createPublication.id,
        mediaId: createPublication.mediaId,
        postId: createPublication.postId,
        date: createPublication.date
      }
    ]);
  });

  it('GET /publications/:id => Should return status code 200 and a Publication', async () => {
    const media = await mediaFactory.createMedia(prisma);
    const post = await postFactory.createPost(prisma);
    const createPublication = await publicationFactory.createPublication(prisma, media.id, post.id);

    const response = await request(app.getHttpServer())
      .get(`/publications/${createPublication.id}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      {
        id: createPublication.id,
        mediaId: createPublication.mediaId,
        postId: createPublication.postId,
        date: createPublication.date
      }
    )
  });

  it('PATCH /publications/:id => Should return status code 200', async () => {
    const media = await mediaFactory.createMedia(prisma);
    const post = await postFactory.createPost(prisma);
    const createPublication = await publicationFactory.createPublication(prisma, media.id, post.id);
    const updatePublication = await publicationFactory.updatePublicationId(prisma, createPublication.id, media.id, post.id);

    await request(app.getHttpServer())
      .patch(`/publications/${updatePublication.id}`)
      .send(updatePublication);

    const response = await request(app.getHttpServer())
      .get(`/publications/${updatePublication.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.OK);
    const updatedPublication = await publicationFactory.readPublicationId(prisma, updatePublication.id);
    expect(updatedPublication.mediaId).toBe(updatePublication.mediaId);
    expect(updatedPublication.postId).toBe(updatePublication.postId);
    expect(updatedPublication.date).toBe(updatePublication.date)
  })

  it('DELETE /publications/:id => Should return status code 202', async () => {
    const media = await mediaFactory.createMedia(prisma);
    const post = await postFactory.createPost(prisma);
    const createPublication = await publicationFactory.createPublication(prisma, media.id, post.id);

    const response = await request(app.getHttpServer())
      .delete(`/publications/${createPublication.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    const deletedPublication = await publicationFactory.readPublicationId(prisma, createPublication.id);
    expect(deletedPublication).toBe(null);
  });
  
});
