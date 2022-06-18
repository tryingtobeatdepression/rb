import { Body, Controller, Delete, Get, HttpCode, Param, Post, Put, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/decorators/role.decorator';
import { Role } from 'src/enums/role.enum';
import { CreateWorkshopDto } from './create-workshop.dto';
import { WorkshopsService } from './workshops.service';

// Tested ✅
// @Roles(Role.Admin)
// @UseGuards(JwtAuthGuard, RolesGuard)
@Controller('workshops')
export class WorkshopsController {
    constructor(private workshopsService: WorkshopsService) {}

    @Get('list')
    @HttpCode(200)
    async list() {
        return await this.workshopsService.findAll();
    }

    @Post('create')
    @HttpCode(201)
    async create(@Body() createWorkshopDto: CreateWorkshopDto) {        
        return await this.workshopsService.create(createWorkshopDto);
    }

    @Get(':id')
    @HttpCode(200)
    async getWorkshop(@Param('id') id: string) {
        return await this.workshopsService.findWorkshop(id);
    }

    @Put(':id')
    @HttpCode(200)
    async edit(@Param('id') id: string, @Body() createWorkshopDto: CreateWorkshopDto) {
        return await this.workshopsService.edit(id, createWorkshopDto);
    }

    @Delete(':id')
    @HttpCode(200)
    async delete(@Param('id') id: string) {
        return await this.workshopsService.deleteOne(id);
    }
}
