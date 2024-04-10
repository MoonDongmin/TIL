import {
    Injectable, 
} from '@nestjs/common';

import {
    CreateRecordsDto, 
} from './dto/create.records.dto';

import {
    PrismaClient, 
} from '@prisma/client';

const prisma = new PrismaClient();

function add9Hours(date: Date): Date {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}

@Injectable()
export class RecordsService {

    async createRecord(createRecordDto: CreateRecordsDto): Promise<void> {
        const currentDate = new Date();
        const newDate = add9Hours(currentDate);
        const user = JSON.stringify(await prisma.user.findFirst({
            select: {
                id: true,
            },
        })).match(/"id":"(.*?)"/)[1];

        try {
            await prisma.record.create({
                data: {
                    title: createRecordDto.title,
                    state: createRecordDto.state,
                    country: createRecordDto.country,
                    start_time: createRecordDto.start_time,
                    end_time: createRecordDto.end_time,
                    created_at: newDate,
                    content: createRecordDto.content,
                    user_id: user,
                },
            });
            console.log('등록 성공');
        } catch (error) {
            console.error('등록 실패', error);
            throw error;
        }
    }
}
