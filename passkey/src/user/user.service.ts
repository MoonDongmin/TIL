import {Injectable}   from "@nestjs/common";
import {PrismaClient} from "@prisma/client";
import {
    generateRegistrationOptions,
    verifyRegistrationResponse,
}                     from "@simplewebauthn/server";
import {
    AuthenticatorTransportFuture,
    Base64URLString,
    PublicKeyCredentialCreationOptionsJSON,
}                     from "@simplewebauthn/types";

const prisma = new PrismaClient();
const rpName = "Passkey Test";
const rpID = "localhost";
const origin = `https://${rpID}`;


@Injectable()
export class UserService {
    // get 메서드
    public async getRegister(userId: number) {
        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        const userPasskeys = await prisma.passkey.findMany({
            where: {userId: userId},

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

    async postRegister(userId: number) {
        const user = await prisma.user.findUnique({
            where: {id: userId},
        });

        const currentOptions:  PublicKeyCredentialCreationOptionsJSON
    }
}
