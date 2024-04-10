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
    async createUser(createUserDto: CreateUserDto):Promise<any> {
        try {
            await prisma.user.create({
                data: {
                    'email':createUserDto.email,
                    'password':createUserDto.password,
                    'nickname':createUserDto.nickname,
                },
            });
            console.log("등록 성공");
        } catch (error) {
            console.log('등록 실패',error);
            throw error;
        }
    }
}
