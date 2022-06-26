import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Product } from "src/products/product.schema";
import { User } from "src/users/user.schema";

@Schema({ timestamps: false, })
class OrderItem {
    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Product'})
    productId: Product;

    @Prop()
    quantity: number;

    @Prop()
    discount: number;
}

export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);

interface IOrderItem {
    productId: string;
    quantity: number;
    discount: number;
}


@Schema({ timestamps: true, })
export class Order {
    @Prop({
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    })
    userId: User;

    @Prop({ default: false, })
    isConfirmed: boolean;
    
    @Prop({
        type: [OrderItemSchema],
        default: []
    })
    items: IOrderItem[];

    @Prop({ default: 0, })
    totalDiscount: number;
}