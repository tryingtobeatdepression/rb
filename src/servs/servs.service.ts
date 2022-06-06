import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateServDto } from './create-serv.dto';
import { Serv, ServDocument } from './serv.schema';

@Injectable()
export class ServsService {
    constructor(@InjectModel(Serv.name) private serviceModel: Model<ServDocument>) {}

    async create(createServDto: CreateServDto): Promise<Serv> {
        const service = new this.serviceModel(createServDto);
        return service.save();
    }

    async findAll(): Promise<Serv[]> {
        return await this.serviceModel.find().exec();
    }

    async delete(id: string): Promise<Serv> {
        return await this.serviceModel.findByIdAndDelete(id).exec();
    }
}
