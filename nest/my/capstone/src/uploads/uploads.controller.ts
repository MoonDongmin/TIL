import {
    Body,
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from '@nestjs/common';
import {
    FilesInterceptor, 
} from '@nestjs/platform-express';
import {
    multerOptions, 
} from '../utils/multer.options';
import {
    UploadsService, 
} from './uploads.service';

@Controller('uploads')
export class UploadsController {
    constructor(private readonly uploadsService: UploadsService) {}

	@UseInterceptors(FilesInterceptor('image', 5, multerOptions('images')))
	@Post('')
    async uploadFile(
		@UploadedFiles() files: Array<Express.Multer.File>,
    ): Promise<void> {
        console.log(files);
        // console.log(files[0].filename);
        // 데이터베이스에는 이 폴더의 경로가 저장이 됨
        // return {
        //     image: `http://localhost:3000/media/images/${files[0].filename}`,
        // };

        // id => 현재 로그인 된 아이디 정보를 의미
        // return await this.uploadsService.uploadImg(files);
    }
}
