import { IsNotEmpty, IsNumber, MaxLength } from "class-validator";

export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(128)
    name: string;

    @MaxLength(256)
    description: string;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false, })
    price: number;

    @IsNumber()
    availableQuantity: number;

    @IsNumber()
    reservedQuantity: number;

    // Helpful when moving from paper to paperless system.
    @IsNumber()
    soldQuantity: number;
}