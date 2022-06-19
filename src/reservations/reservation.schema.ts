import { Injectable } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import moment from "moment";
import mongoose, { Document } from "mongoose";
import { User } from "src/users/user.schema";
import { ReservationsService } from "./reservations.service";


export type ReservationDocument = Reservation & Document;

@Schema({ timestamps: true, })
export class Reservation {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    userId: User;

    @Prop({})
    reservationStart: Date;

    @Prop({
        default: null,
    })
    reservationEnd: Date;

    @Prop()
    duration: Number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);


