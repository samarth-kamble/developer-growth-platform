import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { prisma } from '@workspace/database';
import { Resend } from 'resend';
import { getResetPasswordEmailTemplate } from '../lib/email/templates/reset-password';

const resend = new Resend(process.env.RESEND_API_KEY || "re_dummy_key");

export const auth = betterAuth({
  baseURL: process.env.BETTER_AUTH_URL || 'http://localhost:8080/api/auth',
  user: {
    additionalFields: {
      onboardingCompleted: { type: "boolean", defaultValue: false },
    }
  },
  trustedOrigins: ['http://localhost:3000'],
  database: prismaAdapter(prisma, {
    provider: 'postgresql',
  }),
  emailAndPassword: {
    enabled: true,
    sendResetPassword: async ({ user, url, token }) => {
      // Better Auth generates `url` pointing to the API Gateway.
      // We must override it to point to the Next.js frontend page instead!
      // CRITICAL: We encode the token to ensure special characters don't get lost!
      const frontendUrl = `${process.env.FRONTEND_URL || 'http://localhost:3000'}/reset-password?token=${encodeURIComponent(token)}`;
      await resend.emails.send({
        from: process.env.EMAIL_FROM || 'Devlio <noreply@samarth-kamble.me>',
        to: user.email,
        subject: 'Reset your password',
        html: getResetPasswordEmailTemplate(frontendUrl, user.name || "there"),
      });
    },
  },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
});
