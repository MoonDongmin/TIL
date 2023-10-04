import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import * as mongoose from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";
import { ChatsGateway } from './chats/chats.gateway';
import { ChatsModule } from './chats/chats.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL),
        ChatsModule
    ],
    controllers: [AppController],
    providers: [],
})
export class AppModule implements NestModule {
    configure() {
        const DEBUG = process.env.MODE === 'dev' ? true : false;
        mongoose.set('debug', DEBUG);
    }
}
