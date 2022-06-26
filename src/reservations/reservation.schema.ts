import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import moment from "moment";
import mongoose, { Document } from "mongoose";
import { Serv } from "src/servs/serv.schema";
import { User } from "src/users/user.schema";
import { ReservationsService } from "./reservations.service";


export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: false, })
export class Item {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Serv'})
    serviceId: Serv;
    
    @Prop()
    discount: number;
}

export const ItemSchema = SchemaFactory.createForClass(Item);

export interface IItem {
    serviceId: string;
    discount: number;
}

@Schema({ timestamps: true, })
export class Reservation {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    userId: User;

    @Prop({
        required: [true, 'Reservation must have a starting date.'],
    })
    reservationStart: Date;

    @Prop({
        default: null,
    })
    reservationEnd: Date;

    @Prop()
    duration: number;

    @Prop({ default: false, })
    isConfirmed: boolean;

    @Prop({
        type: [ItemSchema],
        default: []
    })
    items: IItem[];

    @Prop({ default: 0, })
    totalDiscount: number;

}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);


