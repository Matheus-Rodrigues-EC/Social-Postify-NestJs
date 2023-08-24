import { Body, Controller, Get, Post, Patch, Delete, HttpCode, Param } from '@nestjs/common';
import { MediasService } from './medias.service';
import { createMediaDTO } from './dtos/mediaDTO';

@Controller('medias')
export class MediasController {
    constructor(private readonly mediasService: MediasService){};

    @Post('/')
    @HttpCode(201)
    postMedia(@Body() body: createMediaDTO)  {
        return this.mediasService.createMedia(body);
    }

    @Get('/')
    @HttpCode(200)
    getMedia() {
        return this.mediasService.readMedias();
    }

    @Get(':id')
    @HttpCode(200)
    getMediaId(@Param("id") id: number ){
        return this.mediasService.readMediaId(Number(id));
    }

    @Patch(':id')
    @HttpCode(202)
    updateMediaId(@Param("id") id: number, @Body() body: createMediaDTO){
        return this.mediasService.updateMediaId(id, body)
    }

    @Delete(':id')
    @HttpCode(202)
    deleteMediaId(@Param("id") id: number){
        return this.mediasService.deleteMediaId(Number(id));
    }

}
