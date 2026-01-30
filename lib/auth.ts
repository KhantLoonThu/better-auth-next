import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "./db";
import { nextCookies } from "better-auth/next-js";
import { sendVerificationEmail } from "./send-verification-email";

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true,
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async ({ user, url }) => {
            await sendVerificationEmail({
                /**
                 * TODO: update the email to registered user's mail after registering the domain.
                 * because Resend doesn't allow multiple email without a domain.
                 */
                to: 'khantloonthu66@gmail.com',
                verificationUrl: url,
                userName: user.name,
            });
        },
    },
    plugins: [
        nextCookies(),
    ]
});