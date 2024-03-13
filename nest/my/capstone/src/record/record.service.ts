import {
    HttpException,
    HttpStatus,
    Injectable,
} from "@nestjs/common";

import {v1 as uuid} from "uuid";
import {CreateRecordDto} from "./dto/create.record.dto";


@Injectable()
export class RecordService {
    async createRecord(createRecordDto: CreateRecordDto): Promise<string> {
        const { title, content, image, location, time, createdAt } = createRecordDto;

        if (!(title && content && image && location && time && createdAt)) {
            console.log("모든 필드를 입력해야 합니다.");
            throw new HttpException('모든 필드를 입력해야 합니다.', HttpStatus.BAD_REQUEST);
        }

        return uuid();
    }

}
