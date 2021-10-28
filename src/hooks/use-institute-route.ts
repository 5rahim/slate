import { Session } from 'next-auth'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useSession } from 'next-auth/client'
import { useCurrentSchoolQuery } from '../graphql/queries/schools/hooks'
import { Utils } from '../utils'


export const useInstituteRoute = () => {
   
   const router = useRouter()
   const [session, loading] = useSession()
   
   const [isLoading, setIsLoading] = useState<boolean>(loading)
   const [displayPage, setDisplayPage] = useState<boolean>(false)
   
   // Check if institute exists
   const { loading: queryLoading, data } = useCurrentSchoolQuery(Utils.Url.getIID() as any)
   
   
   useEffect(() => {
      if (typeof window !== 'undefined') {
         if (!session && !loading) {
      
            setIsLoading(true)
            router.push('/auth/signin')
      
         } else if (!Utils.Url.getIID() && session && !loading) {
      
            setIsLoading(true)
            router.push('/auth/redirect')
      
         } else if (Utils.Url.getIID() && session && !loading) {
      
            if (!queryLoading && !data) {
               setIsLoading(true)
               router.push(Utils.Url.baseLinkTo('/auth/redirect'))
            }
      
         } else {
            setIsLoading(loading)
         }
   
         if (Utils.Url.getIID() && session && !loading && !queryLoading && !!data) {
            setDisplayPage(true)
         } else {
            setDisplayPage(false)
         }
      }
      
      // console.log(!!getIID(), !!session, loading)
      
      
   }, [session, loading, queryLoading, data])
   
   return [isLoading, displayPage]
   
}
