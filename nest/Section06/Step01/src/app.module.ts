import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {ConfigModule} from "@nestjs/config";
import * as mongoose from "mongoose";
import {MongooseModule} from "@nestjs/mongoose";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
        }),
        MongooseModule.forRoot(process.env.MONGODB_URL)
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
