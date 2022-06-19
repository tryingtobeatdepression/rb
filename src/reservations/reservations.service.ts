import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import moment from 'moment';
import { Model } from 'mongoose';
import { CreateReservationDto } from './create-reservation.dto';
import { Reservation, ReservationDocument } from './reservation.schema';

@Injectable()
export class ReservationsService {
    constructor(@InjectModel(Reservation.name)
    private reservationModel: Model<ReservationDocument>) { }

    async create(createReservationDto: CreateReservationDto) {

    }

    async findAll(): Promise<Reservation[]> {
        return await this.reservationModel.find().exec();
    }

    private async validateReservationDate(newResStart: number, newResEnd: number) {
        return (await this.findAll()).every(reservation => {
            let existingResStart: number = new Date(reservation.reservationStart).getTime();
            let existingResEnd: number = new Date(reservation.reservationEnd).getTime();
            // Check for clashes 
            return !clashesWithExisting(existingResStart, existingResEnd, newResStart, newResEnd);
        });
    }
}

// Check for reservation clash 
let clashesWithExisting = (existingResStart: number, existingResEnd: number,
    newResStart: number, newResEnd: number): boolean => {
    if ((newResStart >= existingResStart && newResStart < existingResEnd) ||
        (existingResStart >= newResStart && existingResStart < newResEnd))
        throw new Error(
            `Reservation could not be saved.\nThere's a clash with an existing reservation from ${moment(existingResStart).format('HH:mm')} to ${moment(existingResEnd).format('HH:mm on LL')}`
        )
    // Return false if there is no clash 
    return false;
};

// Add 
let addMinutes = (date: Date, minutes: number): number => {
    return new Date(date.getTime() + minutes * 6000).getTime();
}