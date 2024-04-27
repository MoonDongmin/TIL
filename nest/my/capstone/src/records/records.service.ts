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
    constructor(
		private readonly usersService: UsersService,
		private readonly uploadService: UploadsService,
    ) {}

    // 기록 생성
    async createRecord(
        createRecordDto: CreateRecordsDto,
        files: Express.Multer.File[],
    ): Promise<string> {
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
            await this.uploadService.uploadImg(files, record.id);
            console.log('등록 성공');

            return record.id;
        } catch (error) {
            console.error('등록 실패', error);
            throw error;
        }
    }

    // 기록 조회(다)
    async getAllRecords(userId: string): Promise<any> {
        try {
            await prisma.record.findMany({
                where: {
                    userId: userId,
                },
            });

            return '찾기 성공';
        } catch (error) {
            // 에러가 발생했을 때 처리할 로직
            console.error('찾기 실패:', error);
            throw new Error('기록 찾기 실패...');
        }
    }

    // 기록 조회(단)

    // 기록 수정

    // 기록 삭제
    async removeRecord(recordId: string): Promise<string> {
        try {
            await prisma.record.delete({
                where: {
                    id: recordId,
                },
            });

            return '삭제 완료';
        } catch (error) {
            // 에러가 발생했을 때 처리할 로직
            console.error('Error while deleting record:', error);
            throw new Error('Failed to delete record');
        }
    }
}
