import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type ProductDocument = Product & Document;

@Schema()
export class Product {
    @Prop()
    name: string;

    @Prop()
    description: string;

    @Prop()
    price: number;

    @Prop()
    availableQuantity: number;

    @Prop()
    reservedQuantity: number;

    @Prop()
    soldQuantity: number;
}

export const ProductSchema = SchemaFactory.createForClass(Product);