import {
    Injectable, 
} from '@nestjs/common';
import {
    CreateUserDto, 
} from './dto/create.user.dto';
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
    async createUser(createUserDto: CreateUserDto): Promise<any> {
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

            return {
                user: user.id,
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

    async deleteUser(id: number): Promise<any> {
        try {
            return await prisma.user.delete({
                where: {
                    id: id,
                },
            });
        } catch (error) {
            console.log('삭제 실패', error);
            throw error;
        }
    }
}
