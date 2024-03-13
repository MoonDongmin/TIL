import {Module}        from "@nestjs/common";
import {AppController} from "./app.controller";
import {AppService}    from "./app.service";
import {UsersModule}   from "./users/users.module";
import {ConfigModule}  from "@nestjs/config";
import {TypeOrmModule}  from "@nestjs/typeorm";
import { RecodeModule } from './record/recode.module';


@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 5432,
            username: 'postgres',
            password: 'postgres',
            database: 'moon',
            synchronize: true, // 개발 환경에서만 사용하도록 설정합니다.
        }),
        RecodeModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {
}
