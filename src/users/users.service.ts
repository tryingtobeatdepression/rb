import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateUserDto } from './create-user.dto';
import { User, UserDocument } from './user.schema';

@Injectable()
export class UsersService {
    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}
    
    /**
     * Signup 
     * @param createUserDto 
     * @returns 
     */
    async create(createUserDto: CreateUserDto): Promise<User> {
        const user = new this.userModel(createUserDto);
        return user.save();
    }

    /**
     * Get all Users
     * @returns 
     */
    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    /**
     * Find User by username
     * @param username 
     * @returns 
     */
    async findByUsername(username: string): Promise<User> {
        // FIXME: This query is returning weird stuff 
        const user = await this.userModel.findOne({ username: username, }).exec();
        return user;
    }
}