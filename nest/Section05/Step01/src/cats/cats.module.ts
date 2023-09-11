import {forwardRef, Module} from '@nestjs/common';
import {CatsController} from './controller/cats.controller';
import {CatsService} from './services/cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";
import {CatsRepository} from "./cats.repository";
import {AuthModule} from "../auth/auth.module";
import {MulterModule} from "@nestjs/platform-express";
import {Comments, CommentsSchema} from "../comments/comments.schema";
import {MulterExtendedModule} from 'nestjs-multer-extended';
import {ConfigModule} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MulterModule.register({
            dest: './upload',
        }),
        MulterExtendedModule.register({
            awsConfig: {
                accessKey: process.env.AWS_S3_ACESS_KEY,
                secretAccessKey: process.env.AWS_S3_SECRET_KEY,
                region: process.env.AWS_S3_REGION,
            },
            bucket: process.env.AWS_S3_BUTCKET_NAME,
            basePath: 'cis',
            fileSize: 1 * 1024 * 1024,
        }),
        MongooseModule.forFeature([
            {name: Cat.name, schema: CatSchema},
            {name: Comments.name, schema: CommentsSchema}]),
        forwardRef(() => AuthModule)
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository],
    exports: [CatsService, CatsRepository]
})
export class CatsModule {
}
