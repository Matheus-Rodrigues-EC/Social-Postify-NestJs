import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';
import { PrismaModule } from '../prisma/prisma.module';
import { PostsRepository } from '../posts/posts.repository';
import { MediasRepository } from '../medias/medias.repository';

@Module({
  imports:[PrismaModule],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository, PostsRepository, MediasRepository],
  exports:[PublicationsService]
})
export class PublicationsModule {}
