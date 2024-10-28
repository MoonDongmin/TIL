import {Injectable}   from "@nestjs/common";
import {JwtService}   from "@nestjs/jwt";
import {v4 as uuidv4} from "uuid";


@Injectable()
export class AuthService {
    constructor(private readonly jwtService: JwtService) {
    }

    async loginAsGuest() {
        const guestId = uuidv4();
        const payload = {guestId};
        return {
            accessToken: this.jwtService.sign(payload),
        };
    }
}
