import { Inject, Injectable, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Request } from "express";
import moment from "moment";
import { Reservation } from "src/reservations/reservation.schema";
import { ReservationsService } from "src/reservations/reservations.service";

@ValidatorConstraint({ name: 'NoClashes', async: true, })
@Injectable({ scope: Scope.REQUEST })
export class NoClashesRule implements ValidatorConstraintInterface {
    constructor(
        @Inject(REQUEST) private req: Request,
        private reservationsService: ReservationsService
    ) { }

    async validate(
        value: Date,
        validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            // const [duration] = validationArguments.constraints;
            // console.log(duration)

            this.reservationsService.findAll()?.then(reservations => {
                reservations?.every(reservation => {
                    let existingResStart: number = new Date(reservation.reservationStart).getTime();
                    let existingResEnd: number = new Date(reservation.reservationEnd).getTime();

                    let newResStart: number = value.getTime();
                    let newResEnd: number = addMinutes(value, 50);

                    ;

                    console.log('newResStart: ' + newResStart);
                    console.log('newResEnd: ' + newResEnd);

                    // Check for clashes 
                    return !clashesWithExisting(existingResStart, existingResEnd, newResStart, newResEnd);
                });
            })
        } catch (e: any) {
            console.log('err')
            return false;
        }

        return true;
    }

    defaultMessage(validationArguments: ValidationArguments): string {
        return 'Clash found!';
    }
}

export function NoClashes(relatedProperty?: any, validationOptions?: ValidationOptions) {
    return function (object: any, propertyName: string) {
        registerDecorator({
            name: 'NoClashes',
            propertyName: propertyName,
            target: object.constructor,
            options: validationOptions,
            validator: NoClashesRule,
            constraints: [relatedProperty,],
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