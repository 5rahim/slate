import NextAuth, { Session, User } from 'next-auth'
import GoogleProvider from "next-auth/providers/google"
import { TypeORMLegacyAdapter } from "@next-auth/typeorm-legacy-adapter"
import { JWT } from 'next-auth/jwt'


const useSecureCookies = process?.env?.NEXTAUTH_URL?.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = process.env.NEXTAUTH_URL ? new URL(process.env.NEXTAUTH_URL).hostname : ""


const options = {
   providers: [
      GoogleProvider({
         clientId: process.env.GOOGLE_OAUTH_ID as string,
         clientSecret: process.env.GOOGLE_OAUTH_SECRET as string,
         authorization: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
         profile(profile: any, tokens: any) {
            return {
               id: profile.id.toString(),
               name: profile.name,
               email: profile.email,
               image: profile.picture,
            }
         },
      }),
   ],
   debug: true,
   synchronize: true,
   adapter: TypeORMLegacyAdapter(process.env.HEROKU_DATABASE_URL as string),
   pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      newUser: '/auth/new-account',
   },
   cookies: {
      sessionToken:
         {
            name: `${cookiePrefix}next-auth.session-token`,
            options: {
               httpOnly: true,
               sameSite: 'lax',
               path: '/',
               secure: useSecureCookies,
               domain: hostName == 'vcap.me:3000' ? hostName : '.' + hostName, // add a . in front so that subdomains are included
            },
         },
   },
   callbacks: {
      async session({ session, token, user }: {
         session: Session;
         user: User;
         token: JWT;
      }) {
         session.user = user
         return session
      },
   },
}


// @ts-ignore
export default (req: any, res: any) => NextAuth(req, res, options)
