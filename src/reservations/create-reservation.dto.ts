import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, Validate } from "class-validator";
import { IItem } from "./reservation.schema";

export class CreateReservationDto {
    readonly duration: number;    
    @IsDate()
    @IsNotEmpty()
    readonly reservationStart: Date;

    // FIXME: compound object validation?
    @IsNotEmpty()
    readonly items: IItem[];
}


/**
 * A type with the same fields as CreateReservationDto but with each one optional.
 */
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}

/**
 * Pick a set of properties.
 */
// export class UpdateReservationDurationDto 
//     extends PickType(CreateReservationDto, ['duration'] as const) {}

// export class UpdateNoDurationReservationDto 
//     extends OmitType(CreateReservationDto, ['duration'] as const) {}