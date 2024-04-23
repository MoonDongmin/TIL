import {
    NestFactory, 
} from '@nestjs/core';
import {
    AppModule, 
} from './app.module';
import * as path from 'path';
import {
    NestExpressApplication, 
} from '@nestjs/platform-express';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.useStaticAssets(path.join(__dirname, './uploads'), {
        prefix: '/media', // 저 media 미들웨어로 접근할 수 있게 추가해준 것
    });

    await app.listen(3000);

}

bootstrap();
