import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './create-category.dto';

@Controller('categories')
export class CategoriesController {
    constructor(private categoriesService: CategoriesService) {}

    // ✅
    @Get('/list')
    @HttpCode(200)
    async list() {
        return await this.categoriesService.list();    
    }

    // ✅
    @Post('/create') 
    @HttpCode(201)
    async create(@Body() createCategoryDto: CreateCategoryDto) {
        return await this.categoriesService.create(createCategoryDto);
    }
}
