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
    async uploadImg(
        files: Express.Multer.File[],
        recordId: string,
    ): Promise<void> {
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
