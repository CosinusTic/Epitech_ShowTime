import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Group } from "./group.schema";

@Injectable()
export class GroupService {

    constructor(@InjectModel(Group.name) private groupModel: Model<Group>) {}
    
    async create(group: Group): Promise<Group> {
        const newGroup = new this.groupModel(group);
        return newGroup.save();
    }

    async readAll(): Promise<Group[]> {
        return await this.groupModel.find().exec();
    }

    async readById(id): Promise<Group> {
        return await this.groupModel.findById(id).exec();
    }

    async update(id, group: Group): Promise<Group> {
        return await this.groupModel.findByIdAndUpdate(id, group, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.groupModel.findByIdAndRemove(id);
    }
}
