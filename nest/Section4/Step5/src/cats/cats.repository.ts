import {HttpException, Injectable} from "@nestjs/common";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CatRequestDto} from "./dto/cat.request.dto";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({email});
        if (result) return true;
        else return false;
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }
}
