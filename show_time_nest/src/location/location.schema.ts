import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Location {
   @Prop()
   name: string;
}
export const LocationSchema = SchemaFactory.createForClass(Location);