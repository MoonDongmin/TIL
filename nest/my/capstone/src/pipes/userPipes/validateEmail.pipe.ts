import {
    BadRequestException, Injectable, PipeTransform, 
} from '@nestjs/common';
import {
    PrismaClient, 
} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class ValidateEmailPipe implements PipeTransform {
    async transform(value: string): Promise<any> {
        const email: string = value;

        // 이메일 형식 검사
        const emailPattern =
			/^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-za-z0-9\-]+/;
        if (!emailPattern.test(email)) {
            throw new BadRequestException('유효한 이메일 주소여야 합니다.');
        }

        // 빈 문자열인지 검사
        if (email.trim() === '') {
            throw new BadRequestException('이메일은 빈 문자열일 수 없습니다.');
        }

        // 글자 수 검사
        if (email.length > 50) {
            throw new BadRequestException('이메일은 50자 이내여야 합니다.');
        }

        // 이메일 중복 검사
        const emailExists = await prisma.user.findUnique({
            where: {
                email: email,
            },
        });

        if (emailExists) {
            throw new BadRequestException('이미 존재하는 이메일입니다.');
        }

        return value;
    }
}
