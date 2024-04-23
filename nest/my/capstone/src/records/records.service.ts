import {
    Injectable, UploadedFiles, 
} from '@nestjs/common';

import {
    CreateRecordsDto, 
} from './dto/create.records.dto';

import {
    PrismaClient, 
} from '@prisma/client';
import {
    UsersService, 
} from '../users/users.service';
import {
    UploadsService, 
} from '../uploads/uploads.service';

const prisma = new PrismaClient();

@Injectable()
export class RecordsService {
    constructor(private readonly usersService: UsersService,
				private readonly uploadService: UploadsService) {}

    // 기록 생성

    // async createRecord(createRecordDto: CreateRecordsDto): Promise<void> {
    //     const user: string = await this.usersService.getUserId();
    //
    //     try {
    //         await prisma.record.create({
    //             data: {
    //                 title: createRecordDto.title,
    //                 location: createRecordDto.location,
    //                 startTime: createRecordDto.startTime,
    //                 endTime: createRecordDto.endTime,
    //                 content: createRecordDto.content,
    //                 userId: user,
    //             },
    //         });
    //         console.log('등록 성공');
    //     } catch (error) {
    //         console.error('등록 실패', error);
    //         throw error;
    //     }
    // }
    async createRecord(createRecordDto: CreateRecordsDto,
					   files: Express.Multer.File[]): Promise<void> {
        const user: string = await this.usersService.getUserId();

        try {
            const record = await prisma.record.create({
                data: {
                    title: createRecordDto.title,
                    location: createRecordDto.location,
                    startTime: createRecordDto.startTime,
                    endTime: createRecordDto.endTime,
                    content: createRecordDto.content,
                    userId: user,
                },
            });
            const recordeId = record.id;
            await this.uploadService.uploadImg(files,recordeId);

            console.log('등록 성공');
        } catch (error) {
            console.error('등록 실패', error);
            throw error;
        }
    }

    // 기록 조회(다)

    // 기록 조회(단)

    // 기록 수정

    // 기록 삭제
}
