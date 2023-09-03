import {
    Controller,
    Delete,
    Get,
    HttpException,
    Param,
    ParseIntPipe,
    Patch,
    Post,
    Put,
    UseFilters, UseInterceptors
} from '@nestjs/common';
import {CatsService} from "./cats.service";
import {HttpExceptionFilter} from "../common/exceptions/http-exception.filter";
import {PositiveIntPipe} from "../common/pipes/positiveInt.pipe";
import {SuccessInterceptor} from "../common/interceptors/success.interceptor";

@Controller('cats')
@UseInterceptors(SuccessInterceptor)
@UseFilters(HttpExceptionFilter)
export class CatsController {
    constructor(private readonly catsService: CatsService) {
    }

    @Get()
    gerCurrentCat() {
        return 'current cat';
    }

    @Post()
    async singup() {
        return 'signup';
    }

    @Post('/login')
    logIn() {
        return 'login';
    }

    @Post('logout')
    logOut() {
        return 'logout';
    }

    @Post('upload/cats')
    uploadCatImg() {
        return 'uploadImg';
    }
}
