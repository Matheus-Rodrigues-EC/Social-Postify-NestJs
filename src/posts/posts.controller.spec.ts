import { INestApplication, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../app.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import * as request from 'supertest';
import * as postFactory from './factories/postsFactory';

describe('Posts E2E Tests', () => {
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
    await prisma.post.deleteMany();
    
    await app.init();
  });

  it('POST /posts => Should create a new Post and return 200 status code', async () => {
    const post = await postFactory.createPost(prisma);

    const response = await request(app.getHttpServer())
      .get(`/posts/${post.id}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body.title).toBe(post.title);
    expect(response.body.text).toBe(post.text);
    expect(response.body.image).toBe(post.image);

    const createdPost = await postFactory.readPostId(prisma, post.id);
    expect(createdPost).not.toBe(null);
  });

  it('GET /posts => Should return status code 200 and a list posts', async () => {
    const createPost = await postFactory.createPost(prisma);

    const response = await request(app.getHttpServer())
      .get('/posts');
    
    expect(response.statusCode).toBe(HttpStatus.OK);
    expect(response.body).toEqual([
      {
        id: createPost.id,
        title: createPost.title,
        text: createPost.text,
        image: createPost.image
      }
    ]);
  });

  it('GET /posts/:id => Should return status code 200 and a post', async () => {
    const createPost = await postFactory.createPost(prisma);

    const response = await request(app.getHttpServer())
      .get(`/posts/${createPost.id}`);

    expect(response.statusCode).toBe(HttpStatus.OK);
    if(response.body.image){
      expect(response.body).toEqual(
        {
          id: createPost.id,
          title: createPost.title,
          text: createPost.text,
          image: createPost.image
        }
      )
    }else{
      expect(response.body).toEqual(
        {
          id: createPost.id,
          title: createPost.title,
          text: createPost.text
        }
      )
    }
  });

  it('PATCH /posts/:id => Should return status code 200', async () => {
    const createPost = await postFactory.createPost(prisma);
    const updatePost = await postFactory.updatePostId(prisma, createPost.id);

    await request(app.getHttpServer())
      .patch(`/posts/${updatePost.id}`)
      .send(updatePost);

    const response = await request(app.getHttpServer())
      .get(`/posts/${updatePost.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.OK);
    const updatedPost = await postFactory.readPostId(prisma, updatePost.id);
    expect(updatedPost.title).toBe(updatePost.title);
    expect(updatedPost.text).toBe(updatePost.text);
    if(updatedPost.image) expect(updatedPost.image).toBe(updatePost.image);
  })

  it('DELETE /posts/:id => Should return status code 202', async () => {
    const createPost = await postFactory.createPost(prisma);

    const response = await request(app.getHttpServer())
      .delete(`/posts/${createPost.id}`);

    if(!response) expect(response.statusCode).toBe(HttpStatus.NOT_FOUND);
    expect(response.statusCode).toBe(HttpStatus.NO_CONTENT);
    const deletedPost = await postFactory.readPostId(prisma, createPost.id);
    expect(deletedPost).toBe(null);
  });
});
