import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from './cats/cats.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import * as mongoose from "mongoose";
import * as process from "process";
import {ConnectOptions} from "mongoose";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule
    ],
    controllers: [AppController],
    providers: [AppService],
})
// 미들웨어 적용하기
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
    }
}

