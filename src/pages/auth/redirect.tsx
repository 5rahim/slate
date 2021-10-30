// const { data: session, status } = useSession()
// const loading = status === "loading"

// const { loading: userLoading, user } = getUserBySession(session)

// useEffect(() => {
//    console.log(user, user?.school)
//    if (user && !!user?.school) {
//       router.push(Utils.Url.schoolLinkTo(user.school.short_name, '/'))
//    } else if (user && !user?.school) {
//       router.push(Utils.Url.baseLinkTo('/auth/new-account'))
//    }
// }, [user])

import { NextApiRequest, NextApiResponse } from 'next'
import { handleAuth, handleCallback } from '@auth0/nextjs-auth0'

const afterCallback = (req: NextApiRequest, res: NextApiResponse, session: any, state: any) => {
   
   console.log(session)
   
   res.redirect('/u')
   
   return session
}

export default handleAuth({
   async callback(req, res) {
      try {
         await handleCallback(req, res, { afterCallback })
      } catch (error) {
         res.status(error.status || 500).end(error.message)
      }
   },
})
