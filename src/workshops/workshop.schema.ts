import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Day } from "src/enums/day.enum";


export type WorkshopDocument = Workshop & Document;

@Schema({ timestamps: true, })
export class Workshop {
    @Prop({ required: [true, 'Workshop name is required.'] })
    name: string;

    @Prop()
    themes: string[];

    @Prop()
    days: Day[];

    @Prop()
    happensEvery: string;

    @Prop()
    duration: string;
}

export const WorkshopSchema = SchemaFactory.createForClass(Workshop);