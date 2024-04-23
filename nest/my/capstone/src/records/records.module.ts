import {
    Module, 
} from '@nestjs/common';
import {
    RecordsService, 
} from './records.service';
import {
    RecordsController, 
} from './records.controller';
import {
    TypeOrmModule, 
} from '@nestjs/typeorm';
import {
    UsersService, 
} from '../users/users.service';
import {
    UploadsService,
} from "../uploads/uploads.service";

@Module({
    imports: [TypeOrmModule.forFeature(),],
    providers: [RecordsService,
        UsersService,
        UploadsService,],
    controllers: [RecordsController,],
})
export class RecordsModule {}
