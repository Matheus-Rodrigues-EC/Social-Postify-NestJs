import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasRepository } from './medias.repository';
import { MediasController } from './medias.controller';
// import { PrismaService } from '../prisma/prisma.service';n
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports:[MediasModule, PrismaModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports:[MediasService]
})
export class MediasModule {}
