import {Injectable, UnauthorizedException} from '@nestjs/common';
import {CatsRepository} from "../cats/cats.repository";
import {LoginRequestDto} from "./dto/login.request.dto";
import * as bcrypt from 'bcrypt';
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(private readonly catsRepository: CatsRepository,
                private jwtService: JwtService,
    ) {
    }

    async jwtLogIn(data: LoginRequestDto) {
        const {email, password} = data;

        // 해당하는 이메일이 있는지 검증
        const cat = await this.catsRepository.findCatByEmail(email);

        if (!cat) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        // 비밀번호가 일치하는지 확인
        const isPasswordValidated: boolean = await bcrypt.compare(
            password,
            cat.password,
        );

        if (!isPasswordValidated) {
            throw new UnauthorizedException('이메일과 비밀번호를 확인해주세요.');
        }

        // 토큰 발급
        const payload = {email: email, sub: cat.id};

        return {
            data: {
                token: this.jwtService.sign(payload),
            }
        };
    }
}
