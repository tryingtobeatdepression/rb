import { Injectable } from "@nestjs/common";
import { registerDecorator, ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface } from "class-validator";
import { Product } from "src/products/product.schema";
import { ProductsService } from "src/products/products.service";

@ValidatorConstraint({ name: 'UniqueProduct', async: true, })
@Injectable()
export class UniqueProductRule implements ValidatorConstraintInterface {
    constructor(private productsService: ProductsService) {}

    async validate(value: string, validationArguments?: ValidationArguments): Promise<boolean> {
        try {
            let products = await this.productsService.findAll();
            for (let i = 0; i < products.length; i++) {
                // FIXME: trim() is not working!
                if (products[i].name.trim().toLowerCase() === value.trim().toLowerCase()) 
                    return false;
            };
        } catch (e: any) {
            return false;
        }
        return true;
    }

    defaultMessage?(validationArguments?: ValidationArguments): string {
        return 'Product already exists!';
    }
}

export function UniqueProduct(validationOptions?: ValidationOptions) {
    return function(object: any, propertyName: string) {
        registerDecorator({
            name: 'UniqueProduct',
            options: validationOptions,
            target: object.constructor,
            propertyName: propertyName,
            validator: UniqueProductRule,
            async: true,
        });
    }
}