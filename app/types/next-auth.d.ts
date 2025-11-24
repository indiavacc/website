/* eslint-disable @typescript-eslint/no-explicit-any */
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email: string;
      vatsim: any; // You can improve typing later
    };
  }

  interface User {
    vatsim: any;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    vatsim: any;
  }
}
