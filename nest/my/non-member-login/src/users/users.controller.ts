import {
    Body,
    Controller,
    Get,
    Post,
} from "@nestjs/common";
import {UsersService} from "./users.service";
import {UserDto}      from "./user.dto";

@Controller("users")
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Get("login")
    login(@Body() UserDto: UserDto): { authToken: string } {
        const authToken = this.userService.getToken();
        console.log({authToken});
        return {authToken};
    }
}
