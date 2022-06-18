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

    @Prop({
        validate: {
            validator: (value: Date) => validateReservationStart(value),
        },
    })
    reservationStart: Date;

    @Prop()
    duration: Number;
}

export const ReservationSchema = SchemaFactory.createForClass(Reservation);

async function validateReservationStart(value: Date) {
    // Extract the User id from the query object 
    let userId: string = this.userId;
    // Convert reservation Date object into a number value
    let resStart: number = new Date(value).getTime();
    let duration: number = this.duration;

    // Add 
    let addMinutes: Function = (date: Date, minutes: number): number => {
        return new Date(date.getTime() + minutes * 6000).getTime();
    }

    // Get reservation end Date
    let resEnd: number = addMinutes(value, duration);

    // Check for reservation clash 
    let clashWithExisting: Function = (existingResStart: number, existingResEnd: number,
        newResStart: number, newResEnd: number): boolean => {
        if ((newResStart >= existingResStart && newResStart < existingResEnd) ||
            (existingResStart >= newResStart && existingResStart < newResEnd))
            throw new Error(
                `Reservation could not be saved.\nThere's a clash with an existing reservation from ${moment(existingResStart).format('HH:mm')} to ${moment(existingResEnd).format('HH:mm on LL')}`
            )
        // Return false if there is no clash 
        return false;
    };


};
