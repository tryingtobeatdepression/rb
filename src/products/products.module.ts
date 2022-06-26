import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './product.schema';
import { UniqueProductRule } from 'src/pipes/unique-product.constraint';

@Module({
  imports: [
    MongooseModule.forFeature([{
      name: Product.name,
      schema: ProductSchema,
    }]),
  ],
  providers: [UniqueProductRule, ProductsService],
  controllers: [ProductsController]
})
export class ProductsModule {}
