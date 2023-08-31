import {
    Body,
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put, Req,
    UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../common/exceptions/http-exception.filter";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";
import {CatRequestDto} from "./dto/cat.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "./dto/cat.dto";
import {AuthService} from "../auth/auth.service";
import {LoginRequestDto} from "../auth/dto/login.request.dto";
import {JwtAuthGuard} from "../auth/jwt/jwt.guard";
import {Request} from "express";
import {CurrentUser} from "../common/decorators/user.decorator";
import {Cat} from "./cats.schema";
declare module "express" {
    export interface Request {
        user: any
    }
}


@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService,
                private readonly authService: AuthService,
    ) {
    }

    @ApiOperation({summary: '현재 고양이 가져오기'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat:Cat) {
        return cat.readOnlyData;
    }

    @ApiResponse({
        status: 500,
        description: 'Server Error...',
    })
    @ApiResponse({
        status: 200,
        description: '성공!',
        type: ReadOnlyCatDto
    })
    @ApiOperation({summary: '회원가입'})
    @Post()
    async signUp(@Body() body: CatRequestDto) {
        return await this.catsService.signUp(body);
    }

    @ApiOperation({summary: '로그인'})
    @Post('/login')
    logIn(@Body() data: LoginRequestDto) {
        return this.authService.jwtLogIn(data);
    }

    @ApiOperation({summary: '로그아웃'})
    @Post('logout')
    logOut() {
        return 'logout';
    }

    @ApiOperation({summary: '고양이 이미지 업로드'})
    @Post('upload/cats')
    uploadCatImg() {
        return 'uploadImg';
    }
}
