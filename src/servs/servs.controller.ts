import { Body, Controller, Delete, Get, HttpCode, Param, Post } from '@nestjs/common';
import { CreateServDto } from './create-serv.dto';
import { ServsService } from './servs.service';

@Controller('servs')
export class ServsController {
    constructor(private servsService: ServsService) {}

    @Post('/create')
    @HttpCode(201)
    async create(@Body() createServDto: CreateServDto) {
        return await this.servsService.create(createServDto);
    }

    @Get('/list')
    @HttpCode(200)
    async list() {
        return await this.servsService.findAll();
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: string) {
        return await this.servsService.delete(id);
    }
}


