import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type CategoryDocument = Category & Document;

@Schema({ timestamps: true, })
export class Category {
    @Prop({
        required: [true, 'Field name is required.'],
        unique: [true, 'Field name must be UNIQUE.'],
    })
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);