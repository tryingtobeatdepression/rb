import { IsNotEmpty, IsNumber, IsOptional, MaxLength } from "class-validator";
import { UniqueProduct } from "src/pipes/unique-product.constraint";

export class CreateProductDto {
    @IsNotEmpty()
    @MaxLength(128)
    @UniqueProduct()
    name: string;

    @MaxLength(256)
    description: string;

    @IsNotEmpty()
    @IsNumber({ allowNaN: false, allowInfinity: false, })
    price: number;

    @IsNumber()
    @IsOptional()
    availableQuantity: number;

    @IsNumber()
    @IsOptional()
    reservedQuantity: number;

    // Helpful when moving from paper to paperless system.
    @IsNumber()
    @IsOptional()
    soldQuantity: number;
}