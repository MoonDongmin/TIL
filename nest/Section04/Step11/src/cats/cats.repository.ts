import {HttpException, Injectable} from "@nestjs/common";
import {Cat} from "./cats.schema";
import {Model} from "mongoose";
import {InjectModel} from "@nestjs/mongoose";
import {CatRequestDto} from "./dto/cat.request.dto";

@Injectable()
export class CatsRepository {
    constructor(@InjectModel(Cat.name) private readonly catModel: Model<Cat>) {
    }

    async findAll() {
        return await this.catModel.find();
    }

    async findCatByIdWithoutPassword(catId: string): Promise<Cat | null> {
        const cat = await this.catModel.findById(catId).select('-password');
        return cat;
    }


    async findCatByEmail(email: string): Promise<Cat | null> {
        const cat = await this.catModel.findOne({email});
        return cat;
    }

    async existsByEmail(email: string): Promise<boolean> {
        const result = await this.catModel.exists({email});
        if (result) return true;
        else return false;
    }

    async create(cat: CatRequestDto): Promise<Cat> {
        return await this.catModel.create(cat);
    }

    async findByIdAndUploadImg(id: string, fileName: string) {
        const cat = await this.catModel.findById(id);

        cat.imgUrl = `http://localhost:8000/media/${fileName}`;

        const newCat = await cat.save();

        console.log(newCat);
        return newCat.readOnlyData;
    }
}
