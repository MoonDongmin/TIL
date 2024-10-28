import {
    Injectable,
    ParseIntPipe,
}                     from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import {
    generateRegistrationOptions,
    VerifiedRegistrationResponse,
    verifyRegistrationResponse,
}                     from "@simplewebauthn/server";
import {
    AuthenticatorTransportFuture,
    Base64URLString,
    PublicKeyCredentialCreationOptionsJSON,
}                     from "@simplewebauthn/types";
import {PasskeyDto}   from "./passkey.dto";

const prisma = new PrismaClient();
const rpName = "Passkey Test";
const rpID = "localhost";
const origin = `https://${rpID}`;


@Injectable()
export class UserService {
    // get 메서드
    public async getRegister(userId: number) {
        const user = await this.getUserFromDB(userId);

        const userPasskeys = await prisma.passkey.findMany({
            where: {userId: user.id},

        });

        const options: PublicKeyCredentialCreationOptionsJSON = await generateRegistrationOptions({
            rpName,
            rpID,
            userName: user.username,
            // Don't prompt users for additional information about the authenticator
            // (Recommended for smoother UX)
            attestationType: "none",
            // Prevent users from re-registering existing authenticators
            excludeCredentials: userPasskeys.map(passkey => ({
                id: passkey.id as Base64URLString,
                // Optional
                transports: passkey.transports as AuthenticatorTransportFuture[],
            })),
            // See "Guiding use of authenticators via authenticatorSelection" below
            authenticatorSelection: {
                // Defaults
                residentKey: "preferred",
                userVerification: "preferred",
                // Optional
                authenticatorAttachment: "platform",
            },
        });

        return options;
    }

    // post 메서드
    async postRegister(body: any) {
        // const user = await this.getUserFromDB(userId);

        let verification: VerifiedRegistrationResponse;

        try {
            verification = await verifyRegistrationResponse({
                response: body,
                expectedChallenge: "37CMLwl2H85rWJLnb78uw4iydh0VHcCJ7vo1JGB6HAs",
                expectedOrigin: origin,
                expectedRPID: rpID,
            });
        } catch (error) {
            console.error(error);
        }

        return verification;
    }


    // passkey 등록
    async registerPasskey(userId: number, passkeyDto: PasskeyDto) {
        const user = await this.getUserFromDB(userId);

        await prisma.passkey.create({
            data: {
                id: passkeyDto.id,
                publicKey: passkeyDto.credentialPublicKey,
                webauthnUserID: passkeyDto.credentialID,
                userId: user.id,
                counter: passkeyDto.counter,
                deviceType: passkeyDto.credentialDeviceType,
                backedUp: passkeyDto.credentialBackedUp,
            },
        });
    }

    async getUserFromDB(userId: number) {
        return prisma.user.findUnique({
            where: {id: userId},
        });
    }
}
