import {
    Module,
}                     from "@nestjs/common";
import {
    UploadsController,
}                     from "./uploads.controller";
import {
    UploadsService,
}                     from "./uploads.service";
import {
    MulterModule,
} from "@nestjs/platform-express";
import {
    ConfigModule,
} from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot(),
        MulterModule.register({
            dest: "./upload",
        }),
    ],
    controllers: [UploadsController,],
    providers: [UploadsService,],
})
export class UploadsModule {
}
