import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import{ExtractJwt, Strategy}from "passport-jwt";

// 인증을 위해 사용한 것
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: 'secret',
            ignoreExpiration: false,
        });
    }

    // async validate(payload){
    // }
}