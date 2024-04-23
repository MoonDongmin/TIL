import {
    Module, 
} from '@nestjs/common';
import {
    AppController, 
} from './app.controller';
import {
    AppService, 
} from './app.service';
import {
    UsersModule, 
} from './users/users.module';
import {
    ConfigModule, 
} from '@nestjs/config';
import {
    RecordsModule, 
} from './records/records.module';
import {
    UploadsModule, 
} from './uploads/uploads.module';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        RecordsModule,
        UploadsModule,
    ],
    controllers: [AppController,],
    providers: [AppService,],
})
export class AppModule {}
