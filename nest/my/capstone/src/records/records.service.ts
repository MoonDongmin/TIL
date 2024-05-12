import {
    HttpStatus,
    Injectable,
} from "@nestjs/common";
import {
    CreateRecordsDto,
} from "./dto/create.records.dto";
import {
    PrismaClient,
} from "@prisma/client";
import {
    UsersService,
} from "../users/users.service";
import {
    UploadsService,
} from "../uploads/uploads.service";
import {
    UpdateRecordsDto,
} from "./dto/update.records.dto";
import {
    response,
} from "express";

const prisma = new PrismaClient();

@Injectable()
export class RecordsService {
    constructor(
        private readonly usersService: UsersService,
        private readonly uploadService: UploadsService,
    ) {
    }

    // 기록 생성
    async createRecord(
        createRecordDto: CreateRecordsDto,
        files: Express.Multer.File[],
        statusCode: HttpStatus = HttpStatus.CREATED,
    ): Promise<any> {
        const user: number = await this.usersService.getUserId();

        try {
            const record = await prisma.record.create({
                data: {
                    title: createRecordDto.title,
                    location: createRecordDto.location,
                    startTime: createRecordDto.startTime,
                    endTime: createRecordDto.endTime,
                    content: createRecordDto.content,
                    userId: user,
                },
            });
            await this.uploadService.uploadImg(files, record.id);
            console.log("등록 성공");

            return {
                statusCode,
                recordId: record.id,
            };
        } catch (error) {
            console.error("등록 실패", error);
            throw error;
        }
    }

    // 기록 조회(다)
    async getAllRecords(userId: number, statusCode: HttpStatus = HttpStatus.OK): Promise<any> {
        try {
            const records = await prisma.record.findMany({
                where: {
                    userId: userId,
                },
                include: {
                    image: {
                        select: {
                            id: true,
                            imageUrl: true,
                        },
                    },
                },
            });

            return {
                statusCode,
                records,
            };
        } catch (error) {
            // 에러가 발생했을 때 처리할 로직
            console.error("찾기 실패:", error);
            throw new Error("기록 찾기 실패...");
        }
    }

    // 기록 조회(단)
    async getRecord(userId: number, recordId: string, statusCode: HttpStatus = HttpStatus.OK): Promise<any> {
        try {
            const record = await prisma.record.findUnique({
                where: {
                    userId: userId,
                    id: recordId,
                },
                include: {
                    image: {
                        select: {
                            id: true,
                            imageUrl: true,
                        },
                    },
                },
            });

            return {
                statusCode
                ,
                record,
            };
        } catch (error) {
            console.log("찾기 실패: ", error);
            throw new Error("기록 단건 조회 실패...");
        }
    }

    // 기록 수정
    async setRecord(
        recordId: string,
        updateRecordsDto: UpdateRecordsDto,
        files: Express.Multer.File[],
        statusCode: HttpStatus = HttpStatus.OK,
    ): Promise<any> {
        try {
            const updatedRecord = await prisma.record.update({
                where: {
                    id: recordId, 
                },
                data: {
                    title:updateRecordsDto.title,
                    location: updateRecordsDto.location,
                    content: updateRecordsDto.content,
                    startTime: updateRecordsDto.startTime,
                    endTime: updateRecordsDto.endTime,
                },
            });

            await this.uploadService.uploadImg(files,recordId);

            return {
                statusCode,
                updatedRecord,
            };
        } catch (error) {
            console.error('업데이트 실패', error);
            throw error;
        }
    }

    // 기록 삭제
    async removeRecord(recordId: string, statusCode: HttpStatus = HttpStatus.NO_CONTENT): Promise<any> {
        try {
            await prisma.record.delete({
                where: {
                    id: recordId,
                },
            });

            return {
                statusCode,
            };
        } catch (error) {
            // 에러가 발생했을 때 처리할 로직
            console.error("Error:", error);
            throw new Error("기록 삭제 실패");
        }
    }
}
