import {
    Body,
    Controller,
    Get,
    HttpException,
    HttpStatus,
    Post,
} from '@nestjs/common';

import {
    RecordsService,
} from './records.service';
import {
    CreateRecordDto, 
} from './dto/create.record.dto';

@Controller('record')
export class RecordsController {
    constructor(private readonly recordService: RecordsService) {}

	@Post('create')
    async createRecord(
		@Body() createRecordDTO: CreateRecordDto,
    ): Promise<void> {
        return await this.recordService.createRecord(createRecordDTO);
    }
}
