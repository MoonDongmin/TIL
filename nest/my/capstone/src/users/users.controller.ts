import {
    Body,
    Controller,
    Delete,
    Param,
    Post,
    Patch,
    UsePipes,
} from '@nestjs/common';
import {
    UsersService, 
} from './users.service';
import {
    SignupUserDto, 
} from './dto/signup.user.dto';
import {
    SigninUserDto, 
} from './dto/signin.user.dto';
import {
    ApiOperation, ApiTags, 
} from '@nestjs/swagger';
import {
    UpdateUserDto, 
} from './dto/update.user.dto';
import {
    ValidatePasswordPipe, 
} from '../pipes/validatePassword.pipe';
import {
    ValidateEmailPipe, 
} from '../pipes/validateEmail.pipe';
import {
    ValidateNicknamePipe, 
} from '../pipes/validateNickname.pipe';

@Controller('/api/users')
@ApiTags('User API')
export class UsersController {
    constructor(private readonly userService: UsersService) {}

	@Post('/signup')
	@UsePipes(ValidateEmailPipe, ValidatePasswordPipe, ValidateNicknamePipe)
	@ApiOperation({
	    summary: '유저 생성',
	    description: 'id, nickname, email, password로 유저 생성 진행',
	})
    async signup(@Body() createUserDto: SignupUserDto): Promise<void> {
        return await this.userService.createUser(createUserDto);
    }

	@Post('/signin')
	@ApiOperation({
	    summary: '유저 로그인',
	    description: '아이디와 비밀번호로 유저 로그인 진행, id 반환',
	})
	async signin(@Body() signinUserDto: SigninUserDto): Promise<void> {
	    return await this.userService.signinUser(signinUserDto);
	}

	@Patch('')
	async updateUserNickname(
		@Body() updateUserDto: UpdateUserDto,
	): Promise<void> {
	    return await this.userService.updateUserNickname(
	        updateUserDto.email, updateUserDto.nickname,
	    );
	}

	@Delete('/:id')
	@ApiOperation({
	    summary: '유저 삭제',
	    description: 'id로 유저 삭제',
	})
	async deleteUser(@Param('id') id: string): Promise<void> {
	    return await this.userService.deleteUser(id);
	}
}
