import {
    Injectable,
} from '@nestjs/common';

import {
    CreateRecordDto, 
} from './dto/create.record.dto';

import {
    PrismaClient, 
} from '@prisma/client';

const prisma = new PrismaClient();

function add9Hours(date: Date): Date {
    return new Date(date.getTime() + 9 * 60 * 60 * 1000);
}

@Injectable()
export class RecordsService {
    async createRecord(createRecordDto: CreateRecordDto): Promise<void> {
        const currentDate = new Date();
        const newDate = add9Hours(currentDate);
        try {
            await prisma.record.create({
                data: {
                    title: createRecordDto.title,
                    content: createRecordDto.content,
                    image :createRecordDto.image,
                    state: createRecordDto.state,
                    country: createRecordDto.country,
                    time: createRecordDto.time,
                    createdAt: newDate,
                },
            });
            console.log('등록 성공');
        } catch (error) {
            console.error('등록 실패', error);
            throw error;
        }
    }
}
