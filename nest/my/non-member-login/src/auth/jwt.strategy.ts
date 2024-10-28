// src/auth/jwt.strategy.ts
import {Injectable} from "@nestjs/common";
import {PassportStrategy} from "@nestjs/passport";
import {
    ExtractJwt,
    Strategy,
} from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: "your-secret-key", // 실제 비밀 키를 사용하세요
        });
    }

    async validate(payload: any) {
        return {guestId: payload.guestId};
    }
}
