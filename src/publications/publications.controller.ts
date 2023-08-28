import { Controller, Body, Post, Get, Patch, Delete, HttpCode, Param, Query } from '@nestjs/common';
import { PublicationsService } from './publications.service';
import { createPublicationDTO } from './dtos/publicationDTO';

@Controller('publications')
export class PublicationsController {
    constructor(private readonly publicationsService: PublicationsService){}

    @Get('/health')
    @HttpCode(200)
    getHealth() {
        return this.publicationsService.getHealthPublications();
    }

    @Post('/')
    @HttpCode(201)
    createPublication(@Body() body: createPublicationDTO){
        return this.publicationsService.createPublication(body);
    }
    // , 
    @Get('/')
    @HttpCode(200)
    readPublications(@Query() query?: {published?: boolean, after?: string} ){
        return this.publicationsService.readPublications(query);
    }

    @Get(':id')
    @HttpCode(200)
    readPublication(@Param('id') id: number){
        return this.publicationsService.readPublicationId(Number(id));
    }

    @Patch(':id')
    @HttpCode(204)
    updatePublication(@Param('id') id: number, @Body() body: createPublicationDTO){
        return this.publicationsService.updatePublication(Number(id), body);
    }

    @Delete(':id')
    @HttpCode(204)
    deletePublicationId(@Param('id') id: number){
        return this.publicationsService.deletePublicationId(Number(id));
    }
}
