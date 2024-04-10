import {
    Module,
}               from "@nestjs/common";
import {
    AppController,
}               from "./app.controller";
import {
    AppService,
}               from "./app.service";
import {
    UsersModule,
}               from "./users/users.module";
import {
    ConfigModule,
}               from "@nestjs/config";
import {
    TypeOrmModule,
} from "@nestjs/typeorm";
import {
    RecordsModule,
} from "./records/records.module";
import {
    Connection,
} from "typeorm";

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        TypeOrmModule.forRoot({
            type: "postgres",
            host: "localhost",
            port: 5432,
            username: "postgres",
            password: "postgres",
            database: "capstone",
            synchronize: true,
        }),
        RecordsModule,
    ],
    controllers: [
        AppController,
    ],
    providers: [
        AppService,
    ],
})
export class AppModule {
    constructor(private readonly connection: Connection) {
    }

}
