import {forwardRef, Module} from '@nestjs/common';
import {CatsController} from './controller/cats.controller';
import {CatsService} from './services/cats.service';
import {MongooseModule} from "@nestjs/mongoose";
import {Cat, CatSchema} from "./cats.schema";
import {CatsRepository} from "./cats.repository";
import {AuthModule} from "../auth/auth.module";
import {MulterModule} from "@nestjs/platform-express";
import {Comments, CommentsSchema} from "../comments/comments.schema";
import {ConfigModule} from "@nestjs/config";
import {AwsService} from "../aws/aws.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true
        }),
        MulterModule.register({
            dest: './upload',
        }),
        MongooseModule.forFeature([
            {name: Cat.name, schema: CatSchema},
            {name: Comments.name, schema: CommentsSchema}]),
        forwardRef(() => AuthModule)
    ],
    controllers: [CatsController],
    providers: [CatsService, CatsRepository,AwsService],
    exports: [CatsService, CatsRepository]
})
export class CatsModule {
}
