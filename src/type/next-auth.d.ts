import NextAuth, { DefaultSession, DefaultUser } from 'next-auth';
import { UserData } from './auth';

declare module 'next-auth' {
  interface Session {
    user: UserData & {
      token: string;
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser, UserData {
    token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends UserData {
    token: string;
  }
}
