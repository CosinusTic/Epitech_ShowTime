import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { GroupController } from './group.controller';
import {Group, GroupSchema} from './group.schema'
import { GroupService } from './group.service';

@Module({
    controllers: [GroupController],
    imports: [MongooseModule.forFeature([{name: Group.name, schema: GroupSchema}])],
    providers: [GroupService]
})
export class GroupModule {}
