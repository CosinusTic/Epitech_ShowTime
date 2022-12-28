import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Genre {
   @Prop()
   name: string;
}
export const GenreSchema = SchemaFactory.createForClass(Genre);