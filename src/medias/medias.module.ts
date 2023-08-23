import { Module } from '@nestjs/common';
import { MediasService } from './medias.service';
import { MediasRepository } from './medias.repository';
import { MediasController } from './medias.controller';

@Module({
  imports:[MediasModule],
  controllers: [MediasController],
  providers: [MediasService, MediasRepository],
  exports:[MediasService]
})
export class MediasModule {}
