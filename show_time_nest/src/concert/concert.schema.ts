import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Concert {
   @Prop()
   group: string;
   @Prop()
   date: string;
   @Prop()
   price: string;
   @Prop()
   genre: string;
   @Prop()
   location: string;
   @Prop()
   image_url: string;
}
export const ConcertSchema = SchemaFactory.createForClass(Concert);