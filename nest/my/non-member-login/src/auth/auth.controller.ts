import {
    Controller,
    Post,
}                    from "@nestjs/common";
import {AuthService} from "./auth.service";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {
    }

    @Post("guest-login")
    async loginAsGuest() {
        return this.authService.loginAsGuest();
    }
}
