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
    Put, Req, UploadedFile, UploadedFiles,
    UseFilters, UseGuards, UseInterceptors
} from '@nestjs/common';
import {CatsService} from "../services/cats.service";
import {HttpExceptionFilter} from "../../common/exceptions/http-exception.filter";
import {SuccessInterceptor} from "../../common/interceptors/success.interceptor";
import {CatRequestDto} from "../dto/cat.request.dto";
import {ApiOperation, ApiResponse} from "@nestjs/swagger";
import {ReadOnlyCatDto} from "../dto/cat.dto";
import {AuthService} from "../../auth/auth.service";
import {LoginRequestDto} from "../../auth/dto/login.request.dto";
import {JwtAuthGuard} from "../../auth/jwt/jwt.guard";
import {CurrentUser} from "../../common/decorators/user.decorator";
import {Cat} from "../cats.schema";
import {FileInterceptor} from "@nestjs/platform-express";
import {AwsService} from "../../aws/aws.service";

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
                private readonly awsService: AwsService,

    ) {
    }

    @ApiOperation({summary: '현재 고양이 가져오기'})
    @UseGuards(JwtAuthGuard)
    @Get()
    getCurrentCat(@CurrentUser() cat: Cat) {
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

    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadMediaFile(@UploadedFile() file: Express.Multer.File) {
        console.log(file);
        return await this.awsService.uploadFileToS3('cats', file);
    }

    @Post('cats/check')
    getImageUrl(@Body('key') key: string) {
        return this.awsService.getAwsS3FileUrl(key);
    }

    @ApiOperation({summary: '모든 고양이 가져오기'})
    @Get('all')
    getAllCat() {
        return this.catsService.getAllCat();
    }

}
