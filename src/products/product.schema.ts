import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema({ timestamps: true,})
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop({ default: 0, })
    availableQuantity: number;

    @Prop({ default: 0, })
    reservedQuantity: number;

    @Prop({ default: 0, })
    soldQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
