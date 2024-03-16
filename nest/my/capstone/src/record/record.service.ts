import {
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";

import {v1 as uuid}       from "uuid";
import {CreateRecordDto}  from "./dto/create.record.dto";
import {InjectRepository} from "@nestjs/typeorm";
import {Record}           from "./entities/record.entity";
import {Repository}       from "typeorm";


@Injectable()
export class RecordService {
    constructor(
        @InjectRepository(Record)
        private recordRepository: Repository<Record>,
    ) {
    }


    async recordToken(createRecordDto: CreateRecordDto): Promise<string> {
        return uuid();
    }

    async createRecord(createRecordDto: CreateRecordDto): Promise<CreateRecordDto & Record> {
        const {
            title,
            content,
            image,
            location,
            time,
            createdAt,
        } = createRecordDto;

        if (!(title && content && image && location && time && createdAt)) {
            console.log("모든 필드를 입력해야 합니다.");
            throw new HttpException("모든 필드를 입력해야 합니다.", HttpStatus.BAD_REQUEST);
        }

        return await this.recordRepository.save(createRecordDto);
    }

}
