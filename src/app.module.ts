import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { MediasModule } from './medias/medias.module';
import { PostsModule } from './posts/posts.module';
import { PublicationsModule } from './publications/publications.module';
import { MediasController } from './medias/medias.controller';
// import { MediasService } from './medias/medias.service';
// import { PrismaService } from './prisma/prisma.service';

@Module({
  imports: [AppModule, PrismaModule, MediasModule, PostsModule, PublicationsModule],
  controllers: [AppController, MediasController],
  providers: [AppService],
})
export class AppModule {}
