import { Module } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { PublicationsController } from './publications.controller';
import { PublicationsRepository } from './publications.repository';

@Module({
  imports:[PublicationsModule],
  controllers: [PublicationsController],
  providers: [PublicationsService, PublicationsRepository],
  exports:[PublicationsService]
})
export class PublicationsModule {}
