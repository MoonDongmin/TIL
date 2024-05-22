import {
    BadRequestException, Injectable, PipeTransform, 
} from '@nestjs/common';
import {
    CreateRecordsDto, 
} from '../../records/dto/create.records.dto';

@Injectable()
export class ValidateCreateDtoPipe implements PipeTransform {
    async transform(value: CreateRecordsDto): Promise<CreateRecordsDto> {
        const title = value.title;
        const location = value.location;
        const content = value.content;
        const startTime = value.startTime;
        const endTime = value.endTime;

        if (!value || !title) {
            throw new BadRequestException('제목이 정의되지 않았습니다.');
        }

        if (!value || !location) {
            throw new BadRequestException('위치가 정의되지 않았습니다.');
        }
        if (!value || !content) {
            throw new BadRequestException('내용이 정의되지 않았습니다.');
        }
        if (!value || !startTime || !endTime) {
            throw new BadRequestException('시간 정의되지 않았습니다.');
        }

        // 제목 글자 수 검사
        if (title.length > 50) {
            throw new BadRequestException('제목은 50자 이내여야 합니다.');
        }

        // 위치 글자 수 검사
        if (location.length > 20) {
            throw new BadRequestException('위치는 20자 이내여야 합니다.');
        }

        // 내용 글자 수 검사
        if (title.length > 500) {
            throw new BadRequestException('내용은 500자 이내여야 합니다.');
        }

        // 글자 수 검사
        if (startTime.length > 20  || endTime.length > 20) {
            throw new BadRequestException('시간은 20자 이내여야 합니다.');
        }

        return value;
    }
}
