// src/auth/auth.controller.ts
import {
    Controller,
    Post,
    Body,
    Get,
    Res,
    Req,
    HttpStatus,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { User } from '../user/user.entity';
import {
    generateAuthenticationOptions,
    verifyAuthenticationResponse,
} from '@simplewebauthn/server';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(private readonly userService: UserService) {}

    @Post('register')
    async register(@Body('username') username: string, @Body('publicKey') publicKey: string, @Body('credentialId') credentialId: string) {
        return this.userService.createUser(username, publicKey, credentialId);
    }

    @Post('login-options')
    async loginOptions(@Body('username') username: string, @Res() res: Response) {
        const user: User = await this.userService.findUserByUsername(username);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send('User not found');
        }

        const options = generateAuthenticationOptions({
            rpID: 'your-domain.com', // Replace with your domain
            userVerification: 'preferred',
            allowCredentials: [
                {
                    id: user.credentialId,
                    transports: AuthenticatorTransportFuture[],
                },
            ],
        });

        res.send(options);
    }

    @Post('login')
    async login(@Body() body: any, @Res() res: Response) {
        const { username, response } = body;

        const user: User = await this.userService.findUserByUsername(username);
        if (!user) {
            return res.status(HttpStatus.NOT_FOUND).send('User not found');
        }

        const verification = await verifyAuthenticationResponse({
            response,
            expectedChallenge: response.challenge,
            expectedOrigin: 'https://your-domain.com', // Replace with your domain
            expectedRPID: 'your-domain.com', // Replace with your domain
            requireUserVerification: true,
            authenticator: {
                id: user.credentialId,
                publicKey: Buffer.from(user.publicKey, 'base64'),
                counter: user.counter,
            },
        });

        if (verification.verified) {
            await this.userService.updateUserCounter(user, verification.authenticationInfo.counter);
            res.send('Login successful');
        } else {
            res.status(HttpStatus.UNAUTHORIZED).send('Invalid login');
        }
    }
}
