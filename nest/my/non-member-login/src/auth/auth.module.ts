import {Module}         from "@nestjs/common";
import {AuthService}    from "./auth.service";
import {AuthController} from "./auth.controller";
import {JwtModule}      from "@nestjs/jwt";
import {PassportModule} from "@nestjs/passport";

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: "your-secret-key", // 실제 비밀 키를 사용하세요
            signOptions: {expiresIn: "1h"},
        }),
    ],
    providers: [AuthService],
    controllers: [AuthController],
})
export class AuthModule {
}
