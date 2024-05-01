import {
    Body,
    Controller,
    Delete, Param,
    Post,
} from '@nestjs/common';
import {
    UsersService,
} from './users.service';
import {
    CreateUserDto,
} from './dto/create.user.dto';
import {
    SigninUserDto,
} from './dto/signin.user.dto';
import {
    ApiOperation,
    ApiTags,
} from '@nestjs/swagger';

@Controller('/api/users')
@ApiTags('User API')
export class UsersController {
    constructor(private readonly userService: UsersService) {
    }

    @Post()
    @ApiOperation({
        summary: '유저 생성',
        description: 'id, nickname, email, password로 유저 생성 진행',
    })
    async createUser(@Body() createUserDto: CreateUserDto): Promise<void> {
        return await this.userService.createUser(createUserDto);
    }

    @Post('/signin')
    @ApiOperation({
        summary: '유저 로그인',
        description: '아이디와 비밀번호로 유저 로그인 진행, uuid 반환',
    })
    async signin(@Body() signinUserDto: SigninUserDto): Promise<void> {
        return await this.userService.signinUser(signinUserDto);
    }

    @Delete('/:id')
    @ApiOperation({
        summary: '유저 삭제',
        description: 'uuid로 유저 삭제',
    })
    async deleteUser(@Param('id') id: string): Promise<void> {
        return await this.userService.deleteUser(id);
    }

}
