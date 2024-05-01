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
import {
    DocumentBuilder, SwaggerModule, 
} from '@nestjs/swagger';
import * as process from 'node:process';
import * as expressBasicAuth from 'express-basic-auth';

async function bootstrap(): Promise<void> {
    const app = await NestFactory.create<NestExpressApplication>(AppModule);

    app.use(
        ['/docs',
            '/docs-json',], expressBasicAuth({
            challenge: true,
            users: {
                [process.env.SWAGGER_USER]: process.env.SWAGGER_PASSWORD,
            },
        }),
    );

    const config = new DocumentBuilder()
        .setTitle('GC')
        .setDescription('GC API description')
        .setVersion('1.0.0')
        .build();
    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('/docs', app, document);

    app.useStaticAssets(path.join(__dirname, './uploads'), {
        prefix: '/media', // 저 media 미들웨어로 접근할 수 있게 추가해준 것
    });

    await app.listen(3000);
}

bootstrap();
