import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { CreateProductDto } from './create-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private productsService: ProductsService) {}

    @Post('create')
    @HttpCode(201)
    async create(@Body() createProductDto: CreateProductDto) {
        return await this.productsService.create(createProductDto);
    }

    @Get('list')
    @HttpCode(200)
    async list() {
        return await this.productsService.findAll();
    }
}
