import {
    Controller,
    Post,
    UploadedFile,
    UploadedFiles,
    UseInterceptors,
} from "@nestjs/common";
import {
    FilesInterceptor,
} from "@nestjs/platform-express";
import {
    multerOptions,
} from "../utils/multer.options";

@Controller('uploads')
export class UploadsController {
	@UseInterceptors(FilesInterceptor('file',10,multerOptions("uploads")))
    @Post('')
    async uploadFile(@UploadedFiles() files: Array<Express.Multer.File>):Promise<string> {
        console.log(files);

        return 'upload';
    }
}
