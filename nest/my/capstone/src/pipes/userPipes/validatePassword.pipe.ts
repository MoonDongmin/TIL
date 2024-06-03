import {
    BadRequestException, Injectable, PipeTransform, 
} from '@nestjs/common';
import {
    SignupUserDto, 
} from '../../users/dto/signup.user.dto';

@Injectable()
export class ValidatePasswordPipe implements PipeTransform {
    async transform(signupUserDto: SignupUserDto): Promise<SignupUserDto> {
        const password = signupUserDto.password;

        // 빈 문자열 금지
        if (password.trim() === '') {
            throw new BadRequestException(
                '패스워드는 빈 문자열일 수 없습니다.',
            );
        }

        // 글자 수: 8자리 이상, 20자리 이하
        if (password.length < 8 || password.length > 20) {
            throw new BadRequestException(
                '패스워드는 8자 이상, 20자 이하여야 합니다.',
            );
        }

        // 패스워드 문자열에 공백 불가능
        if (/\s/.test(password)) {
            throw new BadRequestException(
                '패스워드에는 공백이 포함될 수 없습니다.',
            );
        }

        // 영어, 숫자, 특수문자 조합 필수
        const hasLetter = /[A-Za-z]/.test(password);
        const hasNumber = /\d/.test(password);
        const hasSpecialChar = /[~․!@#$%^&*()_\-+=\[\]|\\;:‘“<>,.?/]/.test(
            password,
        );

        if (!hasLetter || !hasNumber || !hasSpecialChar) {
            throw new BadRequestException(
                '패스워드는 영어, 숫자, 특수문자를 포함해야 합니다.',
            );
        }

        return signupUserDto;
    }
}
