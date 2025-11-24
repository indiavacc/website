/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth, { AuthOptions } from "next-auth";
import { OAuthConfig } from "next-auth/providers/oauth";

const vatsimProvider: OAuthConfig<any> = {
  id: "vatsim",
  name: "VATSIM",
  type: "oauth",

  clientId: process.env.VATSIM_CLIENT_ID,
  clientSecret: process.env.VATSIM_CLIENT_SECRET,

  authorization: {
    url: "https://auth.vatsim.net/oauth/authorize",
    params: {
      response_type: "code",
      scope: "full_name email vatsim_details",
    },
  },
  token: "https://auth.vatsim.net/oauth/token",
  userinfo: "https://auth.vatsim.net/api/user",
  checks: ["state"],
  profile(profile: any) {
    return {
      id: profile.data.cid,
      name: profile.data.personal.name_full,
      email: profile.data.personal.email,
      vatsim: profile.data,
    };
  },
};

export const authOptions: AuthOptions = {
  providers: [vatsimProvider],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.vatsim = user.vatsim;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        session.user.vatsim = token.vatsim;
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
