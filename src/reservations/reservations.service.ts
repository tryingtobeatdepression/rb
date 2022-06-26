import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateReservationDto } from './create-reservation.dto';
import { Reservation, ReservationDocument } from './reservation.schema';

@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>) { }

    async create(createReservationDto: CreateReservationDto): Promise<Reservation> {
        // Check if entered values make any clash with existing reservations.
        let clashFound: boolean = await this.isClash(
            createReservationDto.reservationStart.toString(),
            createReservationDto.duration
        );
        if (clashFound == false) {
            const reservation = new this.reservationModel({
                reservationStart: createReservationDto.reservationStart,
                duration: createReservationDto.duration,
                reservationEnd: addMinutes(
                    createReservationDto.reservationStart.toString(),
                    createReservationDto.duration
                ),
            });
            return reservation.save();
        }
        return null;
    }

    async findAll(): Promise<Reservation[]> {
        return await this.reservationModel.find().exec();
    }


    /*******************************************************************
     *                           Validation
     * *****************************************************************
     */

    /**
     * 
     * @param rsvStart 
     * @param duration 
     * @returns     
     */
    private async isClash(rsvStart: string, duration: number): Promise<boolean> {
        const reservations = await this.reservationModel.find().exec();
        let isClash: boolean = false;
        //FIXME: can solve it using 'reduce'/'inject' method?
        for (let i = 0; i < reservations.length; i++) {
            let reservation = reservations[i];
            let existingResStart: number = new Date(reservation.reservationStart).getTime();
            let existingResEnd: number = new Date(reservation.reservationEnd).getTime();

            let newResStart: number = new Date(rsvStart).getTime();
            let newResEnd: number = addMinutes(rsvStart.toString(), duration).getTime();

            // Check for clashes 
            isClash = clashesWithExisting(existingResStart, existingResEnd, newResStart, newResEnd);
            if (isClash) return isClash;
        }
        return isClash;
    }
}

// Check for reservation clash ✅
let clashesWithExisting = (existingResStart: number, existingResEnd: number,
    newResStart: number, newResEnd: number): boolean => {
    if (newResStart >= existingResStart && newResStart < existingResEnd ||
        existingResStart >= newResStart && existingResStart < newResEnd) {
        // throw new Error(
        //     `Reservation could not be saved.\nThere's a clash with an existing reservation.`
        // );
        // from ${moment(existingResStart).format('HH:mm')} to ${moment(existingResEnd).format('HH:mm on LL')}
        // A clash was found 
        return true;
    }
    // Return false if there is no clash 
    return false;
};

// Add 
let addMinutes = (date: string, minutes: number): Date => {
    return new Date(new Date(date).getTime() + minutes * 6000);
};
