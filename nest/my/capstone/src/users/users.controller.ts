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
import {
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
} from "@nestjs/swagger";

@Controller('users')
@ApiTags('User API')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

	@Post()
    @ApiOperation({
        summary: '사용자를 생성하는 API',
        description:
            '사용자를 생성할 때는 email, password, nickname 이 필요하다.',
    })
    @ApiCreatedResponse({ description:'사용자에 대한 고유한 id를 보여줌'
    })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return await this.userService.createUser(createUserDto);
    }

}
