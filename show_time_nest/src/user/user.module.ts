import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { User, UserSchema } from "./user.schema";
import { UserService } from './user.service';

@Module({
    controllers: [UserController],
    imports: [MongooseModule.forFeature([{name: User.name, schema: UserSchema}])],
    providers: [UserService]
})
export class UserModule {}