import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose"
@Schema()
export class Group {
   @Prop()
   name: string;
}
export const GroupSchema = SchemaFactory.createForClass(Group);