import {
    Body,
    Controller,
    Get,
    Post,
} from "@nestjs/common";
import {
    UsersService, 
} from './users.service';
import {
    CreateUserDto, 
} from './dto/create.user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

	@Post()
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return await this.userService.createUser(createUserDto);
    }

    @Get()
	async hi() {
	    return 'hi';
	}
}
