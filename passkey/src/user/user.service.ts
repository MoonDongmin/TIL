// src/user/user.service.ts
import { Injectable } from '@nestjs/common';
import { Repository }     from 'typeorm';
import {User}             from "./user.entity";
import {InjectRepository} from "@nestjs/typeorm";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async createUser(username: string, publicKey: string, credentialId: string) {
        const user = this.userRepository.create({ username, publicKey, credentialId, counter: 0 });
        return this.userRepository.save(user);
    }

    async findUserByUsername(username: string): Promise<User | undefined> {
        return this.userRepository.findOne({ where: { username } });
    }

    async updateUserCounter(user: User, counter: number) {
        user.counter = counter;
        return this.userRepository.save(user);
    }
}
