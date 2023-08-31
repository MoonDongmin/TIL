import {Injectable, UnauthorizedException} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {ExtractJwt, Strategy} from "passport-jwt";
import {Payload} from "./jwt.payload";
import {CatsRepository} from "../../cats/cats.repository";
import {CatRequestDto} from "../../cats/dto/cat.request.dto";

// 인증을 위해 사용한 것
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly catsRepository: CatsRepository) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: `${process.env.JWT_SERCRET}`,
            ignoreExpiration: false,
        });
    }

    async validate(payload: Payload) {
        const cat: CatRequestDto = await this.catsRepository.findCatByIdWithoutPassword(
            payload.sub,
        );

        if (cat) {
            return cat; // request.user 안에 들어가게 됨
        } else {
            throw new UnauthorizedException('접근 오류');
        }
    }
}