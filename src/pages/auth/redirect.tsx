import { useSession } from 'next-auth/react'
import { DefaultHead } from '../../components/Layout/DefaultHead'
import React, { useEffect } from 'react'
import { LoadingScreen } from '../../ui/LoadingScreen'
import { useRouter } from 'next/router'
import { Compose } from '../../next/compose'
import { withAuth } from '../../middlewares/auth/withAuth'
import { withApollo } from '../../graphql/withApollo'
import { getUserBySession } from '../../graphql/queries/users/hooks'
import { Utils } from '../../utils'


function Page() {
   
   const router = useRouter()
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
   
   if (true) {
      return <LoadingScreen />
   }
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={"Redirect"} />
      
      </>
   )
}


export default Compose(
   withApollo({ ssr: true }),
   withAuth({ requireAuth: true }),
)(Page)
