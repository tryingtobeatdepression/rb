import { Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type AboutDocument = About & Document;

@Schema({ timestamps: true, })
export class About {
    // image 
    // title
    // description
    // social media links 
    // promo vid 
}

export const AboutSchema = SchemaFactory.createForClass(About);