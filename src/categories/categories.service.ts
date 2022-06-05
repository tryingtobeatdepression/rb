import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
    constructor(@InjectModel(Category.name) 
        private categoryModel: Model<CategoryDocument>) {}

    async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new this.categoryModel(createCategoryDto);
        return category.save();
    }

    async delete(id: string): Promise<Category> {
        return await this.categoryModel.findByIdAndDelete(id).exec();
    }

    async list(): Promise<Category[]> {
        return await this.categoryModel.find().exec();
    }
}
