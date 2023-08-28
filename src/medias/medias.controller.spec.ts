import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import * as request from 'supertest';
import * as mediaFactory from './factories/mediasFactory';



describe('Medias E2E Tests', () => {
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
    
    await app.init();
  });

  it('POST /medias => Should create a new Media and return 200 status code', async () => {
    const media = await mediaFactory.createMedia(prisma);

    const response = await request(app.getHttpServer())
      .get(`/medias/${media.id}`);
    
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe(media.title);
    expect(response.body.username).toBe(media.username);

    const createdMedia = await mediaFactory.readMediaId(prisma, media.id);
    expect(createdMedia).not.toBe(null);
  });

  it('GET /medias => Should return status code 200 and a list of medias', async () => {
    const createMedia = await mediaFactory.createMedia(prisma);

    const response = await request(app.getHttpServer())
      .get('/medias');

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual([
      {
        id: createMedia.id,
        title: createMedia.title,
        username: createMedia.username
      }
    ]);
  });

  it('GET /medias/:id => Should return status code 200 and a media by id', async () => {
    const createMedia = await mediaFactory.createMedia(prisma);

    const response = await request(app.getHttpServer())
      .get(`/medias/${createMedia.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual(
      {
        id: createMedia.id,
        title: createMedia.title,
        username: createMedia.username
      }
    );
  });

  it('PATCH /medias/:id => Should return status code 200', async () => {
    const createMedia = await mediaFactory.createMedia(prisma);
    const updateMedia = await mediaFactory.updateMediaId(prisma, createMedia.id);

    await request(app.getHttpServer())
      .patch(`/medias/${updateMedia.id}`)
      .send(updateMedia);

    const response = await request(app.getHttpServer())
      .get(`/medias/${updateMedia.id}`)

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.OK);
    const updatedMedia = await mediaFactory.readMediaId(prisma, updateMedia.id);
    expect(updatedMedia.title).toBe(updateMedia.title);
    expect(updatedMedia.username).toBe(updateMedia.username);
  })

  it('DELETE /media/:id => Should return status code 202', async () => {
    const createMedia = await mediaFactory.createMedia(prisma);

    const response = await request(app.getHttpServer())
      .delete(`/medias/${createMedia.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    const deletedMedia = await mediaFactory.readMediaId(prisma, createMedia.id);
    expect(deletedMedia).toBe(null);
  })
});