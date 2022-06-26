import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Role } from "src/enums/role.enum";

// ref: https://github.com/microsoft/TypeScript/blob/v4.5.4/doc/spec-ARCHIVED.md#35-intersection-types
export type UserDocument = User & Document;

@Schema({ timestamps: true, })
export class User {
    @Prop({ required: [true, 'Field name is required.'] })
    name: string;

    @Prop({ required: [true, 'Field email is required.'] })
    email: string;

    @Prop({
        required: [true, 'Field username is required.'],
        unique: [true, 'Field username must be UNIQUE.'],
    })
    username: string;

    @Prop()
    phone: string;
    
    @Prop({ required: [true, 'Field password is required.']} )
    password: string;

    @Prop()
    roles: Role[];

    // TODO: If too many were not confirmed, add the User to the blacklist.
    // TODO: If too many were confirmed, give this User special Offers.
    @Prop({ default: 0, })
    confirmedOrders: number;
}

// inside the class definition
// @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner' })
// owner: Owner;

export const UserSchema = SchemaFactory.createForClass(User);