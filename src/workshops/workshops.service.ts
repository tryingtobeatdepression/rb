import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateWorkshopDto } from './create-workshop.dto';
import { Workshop, WorkshopDocument } from './workshop.schema';

@Injectable()
export class WorkshopsService {
    constructor(@InjectModel(Workshop.name) private workshopModel: Model<WorkshopDocument>) {}

    async create(createWorkshopDto: CreateWorkshopDto): Promise<Workshop> {
        const workshop = new this.workshopModel(createWorkshopDto);
        return workshop.save();
    }

    async findWorkshop(id: string) {
        return await this.workshopModel.findById(id).exec();
    }

    async findAll(): Promise<Workshop[]> {
        return await this.workshopModel.find().exec();
    }

    async deleteOne(id: string): Promise<Workshop> {
        return await this.workshopModel.findByIdAndDelete(id).exec();
    }

    async edit(id: string, payload: any): Promise<Workshop> {
        return await this.workshopModel.findByIdAndUpdate(id, payload).exec();
    }
}
