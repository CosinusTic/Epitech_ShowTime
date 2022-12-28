import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Location } from "./location.schema";

@Injectable()
export class LocationService {

    constructor(@InjectModel(Location.name) private locationModel: Model<Location>) {}
    
    async create(location: Location): Promise<Location> {
        const newLocation = new this.locationModel(location);
        return newLocation.save();
    }

    async readAll(): Promise<Location[]> {
        return await this.locationModel.find().exec();
    }

    async readById(id): Promise<Location> {
        return await this.locationModel.findById(id).exec();
    }

    async update(id, location: Location): Promise<Location> {
        return await this.locationModel.findByIdAndUpdate(id, location, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.locationModel.findByIdAndRemove(id);
    }
}
