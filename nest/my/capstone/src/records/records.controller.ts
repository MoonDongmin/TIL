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
    CreateRecordsDto,
} from './dto/create.records.dto';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordService: RecordsService,
    ) {}

	@Post('create')
    async createRecord(
		@Body() createRecordDTO: CreateRecordsDto,
    ): Promise<void> {
        return await this.recordService.createRecord(createRecordDTO);
    }
}
