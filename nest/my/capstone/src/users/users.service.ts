import {
    Injectable, 
} from '@nestjs/common';
import {
    SignupUserDto, 
} from './dto/signup.user.dto';
import {
    PrismaClient, 
} from '@prisma/client';
import {
    SigninUserDto, 
} from './dto/signin.user.dto';
import {
    response, 
} from 'express';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
    async createUser(createUserDto: SignupUserDto): Promise<any> {
        try {
            await prisma.user.create({
                data: {
                    email: createUserDto.email,
                    password: createUserDto.password,
                    nickname: createUserDto.nickname,
                },
            });

            return response.status(201);
        } catch (error) {
            console.log('등록 실패', error);
            throw error;
        }
    }

    async signinUser(signinUserDto: SigninUserDto): Promise<any> {
        try {
            const user = await prisma.user.findFirst({
                where: {
                    email: signinUserDto.email,
                    password: signinUserDto.password,
                },
            });
            console.log('로그인 성공');
            const records = await prisma.record.findMany({
                where: {
                    userId: user.id,
                },
            });

            return {
                id: user.id,
                nickname: user.nickname,
                recordIds: records.map((recordId) => recordId.id),
            };
        } catch (error) {
            console.log('로그인 실패', error);
            throw error;
        }
    }

    async getUserId(): Promise<number> {
        const user = await prisma.user.findFirst({
            select: {
                id: true,
            },
        });

        return user.id;
    }

    async getUserIdByEmail(email: string): Promise<any> {
        const user = await prisma.user.findUnique({
            where: {
                email: email,
            },
            select: {
                id: true,
            },
        });

        return user.id;
    }

    async updateUserNickname(email: string, nickname: string): Promise<any> {
        try {
            return await prisma.user.update({
                where: {
                    id: await this.getUserIdByEmail(email),
                },
                data: {
                    nickname: nickname,
                },
            });
        } catch (error) {
            console.log('업데이트 실패', error);
            throw error;
        }
    }

    async deleteUser(id: string): Promise<any> {
        try {
            return await prisma.user.delete({
                where: {
                    id: parseInt(id),
                },
            });
        } catch (error) {
            console.log('삭제 실패', error);
            throw error;
        }
    }
}
