import { Injectable } from '@nestjs/common';
import { User } from './user.schema';
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}
    
    async create(user: User): Promise<User> {
        const newUser = new this.userModel(user);
        return newUser.save();
    }

    async readAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }

    async readById(id): Promise<User> {
        return await this.userModel.findById(id).exec();
    }

    async update(id, user: User): Promise<User> {
        return await this.userModel.findByIdAndUpdate(id, user, {new: true})
    }

    async addFavourite(id, user: User, request) {
        return await this.userModel.updateOne({_id: id}, {$push: {favourites: request}})
    }

    async delete(id): Promise<any> {
        return await this.userModel.findByIdAndRemove(id);
    }

    async logWithEmailAndPassword(userToLog) {
        return await this.userModel.findOne({password: userToLog.password, email : userToLog.email});
    }

    async readByToken(token) {
        return await this.userModel.find({access_token: token}).exec();
    }
}
