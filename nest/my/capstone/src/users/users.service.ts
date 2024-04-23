import {
    Injectable, 
} from '@nestjs/common';
import {
    CreateUserDto, 
} from './dto/create.user.dto';
import {
    PrismaClient, 
} from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UsersService {
    // User 생성
    async createUser(createUserDto: CreateUserDto): Promise<any> {
        try {
            await prisma.user.create({
                data: {
                    email: createUserDto.email,
                    password: createUserDto.password,
                    nickname: createUserDto.nickname,
                },
            });
            console.log('등록 성공');
        } catch (error) {
            console.log('등록 실패', error);
            throw error;
        }
    }

    // User 조회

    // User 찾기
    async getUserId():Promise<string> {
        const user = await prisma.user.findUnique({
            where: {
                id: '1666b109-ea53-4db8-8cc7-903c87453425',
            },
            select:{
                id:true,
            },
        });

        return user.id;
    }
    // User 삭제
}
