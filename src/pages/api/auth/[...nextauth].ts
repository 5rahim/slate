import NextAuth, { Session, User } from 'next-auth'
import Providers from 'next-auth/providers'

const useSecureCookies = process?.env?.NEXTAUTH_URL?.startsWith('https://')
const cookiePrefix = useSecureCookies ? '__Secure-' : ''
const hostName = process.env.NEXTAUTH_URL ?  new URL(process.env.NEXTAUTH_URL).hostname : ""


const options = {
   providers: [
      Providers.Google({
         clientId: process.env.GOOGLE_OAUTH_ID,
         clientSecret: process.env.GOOGLE_OAUTH_SECRET,
         authorizationUrl: 'https://accounts.google.com/o/oauth2/v2/auth?prompt=consent&access_type=offline&response_type=code',
         profile(profile: any, tokens: any) {
            return {
               id: profile.id,
               name: profile.name,
               email: profile.email,
               image: profile.picture,
               first_name: profile.given_name,
               last_name: profile.family_name,
            }
         },
      }),
   ],
   debug: true,
   synchronize: true,
   database: process.env.HEROKU_DATABASE_URL,
   pages: {
      signIn: '/auth/signin',
      signOut: '/auth/signout',
      newUser: '/auth/new-account'
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
               domain: hostName == 'vcap.me:3000' ? hostName : '.' + hostName // add a . in front so that subdomains are included
            }
         },
   },
   callbacks: {
      async session(session: Session, userOrToken: User) {
         session.user = userOrToken
         return session
      }
   }
}


// @ts-ignore
export default (req: any, res: any) => NextAuth(req, res, options)
