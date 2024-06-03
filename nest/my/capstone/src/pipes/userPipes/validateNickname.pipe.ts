import {
    BadRequestException, Injectable, PipeTransform, 
} from '@nestjs/common';
import {
    PrismaClient, 
} from '@prisma/client';
import {
    SignupUserDto, 
} from '../../users/dto/signup.user.dto';

const prisma = new PrismaClient();

@Injectable()
export class ValidateNicknamePipe implements PipeTransform {
    async transform(signupUserDto: SignupUserDto): Promise<SignupUserDto> {
        const nickname = signupUserDto.nickname;

        // 빈 문자열 금지 및 글자 수 검사
        if (
            nickname.trim() === '' ||
			nickname.length < 1 ||
			nickname.length > 10
        ) {
            throw new BadRequestException(
                '닉네임은 1자 이상, 10자 이하여야 합니다.',
            );
        }

        // 특수 문자 불가
        const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
        if (specialCharRegex.test(nickname)) {
            throw new BadRequestException(
                '닉네임에는 특수 문자가 포함될 수 없습니다.',
            );
        }

        // 닉네임 중복 검사
        const nicknameExists = await prisma.user.findUnique({
            where: {
                nickname: nickname,
            },
        });

        if (nicknameExists) {
            throw new BadRequestException('이미 존재하는 닉네임입니다.');
        }

        return signupUserDto;
    }
}
