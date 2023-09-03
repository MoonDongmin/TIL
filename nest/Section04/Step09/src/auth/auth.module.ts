import {forwardRef, Module} from '@nestjs/common';
import {AuthService} from './auth.service';
import {PassportModule, PassportStrategy} from "@nestjs/passport";
import {JwtModule} from '@nestjs/jwt';
import {JwtStrategy} from './jwt/jwt.strategy';
import {CatsRepository} from "../cats/cats.repository";
import {CatsModule} from "../cats/cats.module";
import {ConfigModule} from "@nestjs/config";

// JWT를 만들어주는 모듈이라 생각해라
@Module({
    imports: [
        ConfigModule.forRoot(),
        PassportModule.register({defaultStrategy: 'jwt', session: false}),
        JwtModule.register({
            secret: `${process.env.JWT_SERCRET}`,
            signOptions: {expiresIn: '1y'},
        }),
        forwardRef(()=> CatsModule),
    ],
    providers: [AuthService, JwtStrategy],
    exports: [AuthService],
})
export class AuthModule {
}
