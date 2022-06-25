import { IsMongoId, IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { isValidObjectId } from "mongoose";

export class CreateServDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsMongoId()
    @IsNotEmpty()
    category: string;

    @IsNumber({
        allowInfinity: false,
        allowNaN: false,
    })
    
    @Min(0)
    price: number;

    @Min(0)
    @IsNotEmpty()
    seatsCount: number;

    avgTimeExpected: number;
}

