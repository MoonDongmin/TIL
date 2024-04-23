import {
    Body,
    Controller,
    Get,
    Param,
    Post,
    Query,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';

import {
    RecordsService, 
} from './records.service';
import {
    CreateRecordsDto, 
} from './dto/create.records.dto';
import {
    UploadsService, 
} from '../uploads/uploads.service';
import {
    FilesInterceptor, 
} from '@nestjs/platform-express';
import {
    multerOptions, 
} from '../utils/multer.options';

@Controller('records')
export class RecordsController {
    constructor(private readonly recordService: RecordsService) {}

	@UseInterceptors(FilesInterceptor('image', 10, multerOptions('images')))
	@Post('')
    async createRecord(
		@Body() createRecordDTO: CreateRecordsDto,
		@UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<void> {
        return await this.recordService.createRecord(createRecordDTO, files);
    }
}
