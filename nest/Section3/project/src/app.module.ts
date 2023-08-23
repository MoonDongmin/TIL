import {MiddlewareConsumer, Module, NestModule} from '@nestjs/common';
import {AppController} from './app.controller';
import {AppService} from './app.service';
import {CatsModule} from './cats/cats.module';
import {LoggerMiddleware} from "./common/middlewares/logger.middleware";

@Module({
    imports: [CatsModule],
    controllers: [AppController],
    providers: [AppService],
})
// 미들웨어 적용하기
export class AppModule implements NestModule {
    configure(consumer: MiddlewareConsumer): any {
        consumer
            .apply(LoggerMiddleware)
            .forRoutes('cats');
    }
}

