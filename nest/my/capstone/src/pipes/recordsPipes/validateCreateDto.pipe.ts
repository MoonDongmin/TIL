import {
    BadRequestException, Injectable, PipeTransform, 
} from '@nestjs/common';
import {
    CreateRecordsDto, 
} from '../../records/dto/create.records.dto';

@Injectable()
export class ValidateCreateDtoPipe implements PipeTransform {
    async transform(createRecordsDto: CreateRecordsDto): Promise<CreateRecordsDto> {
        const title = createRecordsDto.title;
        const location = createRecordsDto.location;
        const content = createRecordsDto.content;
        const startTime = createRecordsDto.startTime;
        const endTime = createRecordsDto.endTime;

        if (!createRecordsDto) {
            throw new BadRequestException('정상적인 DTO가 도착하지 않음');
        }

        if (!title) {
            throw new BadRequestException('제목이 정의되지 않았습니다.');
        }

        if (!location) {
            throw new BadRequestException('위치가 정의되지 않았습니다.');
        }

        if (!content) {
            throw new BadRequestException('내용이 정의되지 않았습니다.');
        }

        if (!startTime || !endTime) {
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
        if (startTime.length > 20 || endTime.length > 20) {
            throw new BadRequestException('시간은 20자 이내여야 합니다.');
        }

        return createRecordsDto;
    }
}
