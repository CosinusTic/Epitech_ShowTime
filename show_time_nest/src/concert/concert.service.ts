import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Concert } from "./concert.schema";
import { Group } from "src/group/group.schema";

@Injectable()
export class ConcertService {

    constructor(@InjectModel(Concert.name) private concertModel: Model<Concert>) {}
    
    async create(concert: Concert): Promise<Concert> {
        const newConcert = new this.concertModel(concert);
        return newConcert.save();
    }

    async readAll(): Promise<Concert[]> {
        return await this.concertModel.find().exec();
    }

    async readById(id): Promise<Concert> {
        return await this.concertModel.findById(id).exec();
    }

    async update(id, concert: Concert): Promise<Concert> {
        return await this.concertModel.findByIdAndUpdate(id, concert, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.concertModel.findByIdAndRemove(id);
    }

    async filterByLocation(concertLocation){
        return await this.concertModel.find({location: concertLocation});
    }

    async filterByDate(concertDate){
        return await this.concertModel.find({date: concertDate});
    }

    async filterByGroup(concertGroup){
        return await this.concertModel.find({group: concertGroup})
    }
}