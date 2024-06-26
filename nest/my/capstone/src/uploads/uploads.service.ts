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
            // const fileName = `http://localhost:3000/media/images/${file.filename}`;
            const fileName = `/media/images/${file.filename}`;

            await prisma.image.create({
                data: {
                    imageUrl: fileName,
                    recordId: recordId,
                },
            });
        }
    }

    // 이미지 수정
    async updateImg(files: Express.Multer.File[], recordId: string):Promise<void> {
        await prisma.image.deleteMany({
            where:{
                recordId:recordId,
            },
        });

        for (const file of files) {
            const fileName = `/media/images/${file.filename}`;

            await prisma.image.create({
                data: {
                    imageUrl: fileName,
                    recordId: recordId,
                },
            });
        }
    }
}
