import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsDate, IsMongoId, IsNotEmpty, IsNumber, Validate } from "class-validator";
import { NoClashes } from "src/pipes/no-clashes.constraint";

export class CreateReservationDto {
    readonly duration: number;    
    readonly reservationStart: Date;
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