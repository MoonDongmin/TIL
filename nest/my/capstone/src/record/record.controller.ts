import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from "@nestjs/common";

import {RecordService}   from "./record.service";
import {CreateRecordDto} from "./dto/create.record.dto";


@Controller("record")
export class RecordController {
    constructor(private readonly recordService: RecordService) {
    }

    // @Post("create")
    // async createRecord(@Body() createRecordDTO: CreateRecordDto): Promise<CreateRecordDto> {
    //     const createToken = await this.recordService.createRecord(createRecordDTO);
    //
    //     console.log(createToken);
    //     return createToken;
    // }
    @Get("create")
    async createRecord(@Body() createRecordDTO: CreateRecordDto): Promise<{ createToken: string }> {
        const createToken = await this.recordService.recordToken(createRecordDTO);

        console.log(createToken);
        return {createToken};
    }
}
