import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose, { Document } from "mongoose";
import { Category } from "src/categories/category.schema";

export type ServDocument = Serv & Document;

@Schema({ timestamps: true, })
export class Serv {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop({
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Category',
    })
    category: Category;

    @Prop()
    price: number;

    @Prop()
    seatsCount: number;

    @Prop()
    avgTimeExpected: number;
}

export const ServSchema = SchemaFactory.createForClass(Serv);