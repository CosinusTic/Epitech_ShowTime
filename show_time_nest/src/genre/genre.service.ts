import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Genre } from "./genre.schema";

@Injectable()
export class GenreService {

    constructor(@InjectModel(Genre.name) private genreModel: Model<Genre>) {}
    
    async create(genre: Genre): Promise<Genre> {
        const newGenre = new this.genreModel(genre);
        return newGenre.save();
    }

    async readAll(): Promise<Genre[]> {
        return await this.genreModel.find().exec();
    }

    async readById(id): Promise<Genre> {
        return await this.genreModel.findById(id).exec();
    }

    async update(id, genre: Genre): Promise<Genre> {
        return await this.genreModel.findByIdAndUpdate(id, genre, {new: true})
    }

    async delete(id): Promise<any> {
        return await this.genreModel.findByIdAndRemove(id);
    }
}
