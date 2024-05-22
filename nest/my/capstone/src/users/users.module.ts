import {
    Module, 
} from '@nestjs/common';
import {
    UsersService, 
} from './users.service';
import {
    UsersController, 
} from './users.controller';
import {
    ValidateEmailPipe,
} from "../pipes/userPipes/validateEmail.pipe";
import {
    ValidatePasswordPipe,
} from "../pipes/userPipes/validatePassword.pipe";
import {
    ValidateNicknamePipe,
} from "../pipes/userPipes/validateNickname.pipe";

@Module({
    providers: [UsersService,
        ValidateEmailPipe,
        ValidatePasswordPipe,
        ValidateNicknamePipe,],
    controllers: [UsersController,],
})
export class UsersModule {}
