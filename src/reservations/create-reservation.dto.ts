import { OmitType, PartialType, PickType } from "@nestjs/mapped-types";
import { IsDate, IsNotEmpty, IsNumber } from "class-validator";

export class CreateReservationDto {
    @IsNumber({
        allowInfinity: false,
        allowNaN: false,    
    })
    @IsNotEmpty()
    duration: number;  
    
    @IsDate()
    reservationStart: Date;
}

/**
 * A type with the same fields as CreateReservationDto but with each one optional.
 */
export class UpdateReservationDto extends PartialType(CreateReservationDto) {}

/**
 * Pick a set of properties.
 */
export class UpdateReservationDurationDto 
    extends PickType(CreateReservationDto, ['duration'] as const) {}

export class UpdateNoDurationReservationDto 
    extends OmitType(CreateReservationDto, ['duration'] as const) {}