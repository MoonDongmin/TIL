import {
    Body,
    Controller,
    Delete,
    Get,
    HttpCode,
    Param,
    Post,
    Put,
    Res,
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
    FilesInterceptor, 
} from '@nestjs/platform-express';
import {
    multerOptions, 
} from '../utils/multer.options';
import {
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiParam,
    ApiTags,
} from '@nestjs/swagger';
import {
    RecordsResponseDto, 
} from './dto/records.response.dto';
import {
    UpdateRecordsDto, 
} from './dto/update.records.dto';

@Controller('/api/records')
@ApiTags('Records API')
export class RecordsController {
    constructor(private readonly recordService: RecordsService) {}

	// 기록 생성
	@UseInterceptors(FilesInterceptor('images', 5, multerOptions('images')))
	@Post('')
	@ApiOperation({
	    summary: '기록 생성',
	    description:
			'기록을 생성할 때는 title, location, startTime, endTime, createdAt, content, image 가 필요',
	})
	@ApiCreatedResponse({
	    description: '기록에 대한 고유한 ID 생성함',
	    type: RecordsResponseDto,
	})
    async createRecord(
		@Body() createRecordDTO: CreateRecordsDto,
		@UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<string> {
        return await this.recordService.createRecord(createRecordDTO, files);
    }

	// 기록 다건 조회
	@Get(':userId')
	@ApiOperation({
	    summary: '한 명의 사용자에 대한 기록 조회(多)',
	    description:
			'한 명의 사용자에 대한 모든 기록을 보여줌(지금은 사용자가 한 명이기 때문에 userId가 필요)',
	})
	@ApiParam({
	    name: 'userId',
	    type: 'string',
	    description: '(사용자 uuid)1666b109-ea53-4db8-8cc7-903c87453425',
	})
	@ApiCreatedResponse({
	    description: '한 명의 사용자에 대한 모든 기록을 보여줌',
	})
	async getAllRecords(@Param('userId') param: string): Promise<void> {
	    return await this.recordService.getAllRecords(parseInt(param));
	}

	// 기록 단건 조회
	@Get(':userId/:recordId')
	@ApiOperation({
	    summary: '한 명의 사용자에 대한 기록 조회(少)',
	    description: '한 명의 사용자에 대한 하나의 기록을 보여줌',
	})
	@ApiParam({
	    name: 'userId',
	    type: 'string',
	    description: '(사용자 uuid)1666b109-ea53-4db8-8cc7-903c87453425',
	})
	@ApiParam({
	    name: 'recordId',
	    type: 'string',
	    description: '(기록 uuid)1666b109-ea53-4db8-8cc7-903c87453425',
	})
	@ApiCreatedResponse({
	    description: '한 명의 사용자에 대한 하나 기록을 보여줌',
	})
	async getRecord(
		@Param('userId') userId: string,
		@Param('recordId') recordId: string,
	): Promise<void> {
	    return await this.recordService.getRecord(parseInt(userId), recordId);
	}

	// 기록 수정
	@Put(':recordId')
	@UseInterceptors(FilesInterceptor('images', 5, multerOptions('images')))
	@ApiOperation({
	    summary: '기록에 대한 수정',
	    description: '기록을 수정할 수 있음',
	})
	async updateRecord(
		@Param('recordId') recordId: string,
		@Body() updateRecordDto: UpdateRecordsDto,
		@UploadedFiles() files: Array<Express.Multer.File>,
	): Promise<string> {
	    return await this.recordService.setRecord(recordId, updateRecordDto,files);
	}

	// 기록 삭제
	@Delete(':recordId')
	@ApiOperation({
	    summary: '기록 삭제',
	    description: '한 명의 사용자에 대한 기록을 지움',
	})
	@ApiParam({
	    name: 'recordId',
	    type: 'string',
	    description: '(사용자 uuid)1666b109-ea53-4db8-8cc7-903c87453425',
	})
	@ApiCreatedResponse({
	    description: '삭제 성공',
	})
	async removeRecord(@Param('recordId') param: string): Promise<any> {
	    return await this.recordService.removeRecord(param);
	}
}
