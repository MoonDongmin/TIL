import {
    Injectable, 
} from '@nestjs/common';
import {
    PrismaClient, 
} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UploadsService {
    // 이미지 생성
    // async uploadImg(files: Express.Multer.File[]): Promise<void> {
    //     const id = '5a218e6e-36d8-4d2a-be53-4d2a249a4071';
    //
    //     for (const file of files) {
    //         const fileName = `http://localhost:3000/media/images/${file.filename}`;
    //         await prisma.image.create({
    //             data: {
    //                 imageUrl: fileName,
    //                 recordId: id,
    //             },
    //         });
    //     }
    // }
    async uploadImg(files: Express.Multer.File[], recordId: string): Promise<void> {
        for (const file of files) {
            const fileName = `http://localhost:3000/media/images/${file.filename}`;
            await prisma.image.create({
                data: {
                    imageUrl: fileName,
                    recordId: recordId,
                },
            });
        }
    }

    // 이미지 수정

    // 이미지 삭제
}
