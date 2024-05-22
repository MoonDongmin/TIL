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
} from '../uploads/uploads.service';
import {
    ValidateCreateDtoPipe,
} from "../pipes/recordsPipes/validateCreateDto.pipe";

@Module({
    imports: [TypeOrmModule.forFeature(),],
    providers: [RecordsService,
        UsersService,
        UploadsService,
        ValidateCreateDtoPipe,],
    controllers: [RecordsController,],
})
export class RecordsModule {}
