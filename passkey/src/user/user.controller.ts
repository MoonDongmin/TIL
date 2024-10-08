import {
    Body,
    Controller,
    Get,
    Param,
    Post,
}                    from "@nestjs/common";
import {UserService} from "./user.service";

@Controller("user")
export class UserController {
    constructor(private readonly userService: UserService) {
    }

    @Get("/:id")
    async user(@Param("id") id: string) {
        return this.userService.getRegister(Number.parseInt(id));
    }

    @Post()
    async postUser(@Body() body: any) {
        return this.userService.postRegister(body);
    }
}
