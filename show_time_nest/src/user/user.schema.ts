import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type UserDocument = User & Document;

@Schema()
export class User {

    @Prop()
    username: string;
    @Prop()
    password: string;
    @Prop()
    access_token: string;
    @Prop()
    favourites: string[];
    @Prop()
    admin_status: boolean;
    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

