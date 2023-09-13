import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from './cats/cats.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";
import {MongooseModule} from "@nestjs/mongoose";
import {ConfigModule} from "@nestjs/config";
import { AuthModule } from './auth/auth.module';
import { CommentsModule } from './comments/comments.module';
import * as mongoose from "mongoose";
import * as process from "process";
import {CatsRepository} from "./cats/cats.repository";
import {AwsService} from "./aws/aws.service";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MongooseModule.forRoot(process.env.MONGODB_URI),
        CatsModule,
        AuthModule,
        CommentsModule,
    ],
    controllers: [AppController],
    providers: [AppService, AwsService],
})
// 미들웨어 적용하기
export class AppModule implements NestModule {
    private readonly isDev: boolean = process.env.MODE === 'dev' ? true : false;

    configure(consumer: MiddlewareConsumer): any {
        consumer.apply(LoggerMiddleware).forRoutes('*');
        mongoose.set('debug', this.isDev)
    }
}

