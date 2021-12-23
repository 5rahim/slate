import { getLazyAssignment } from '@slate/graphql/schemas/gradebook_items/hooks'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useUserRole } from '@slate/hooks/useUserRole'
import { useCachedLazyQuery } from '@slate/store/cache/hooks/useCachedLazyQuery'
import { Utils } from '@slate/utils'
import { NextPage } from 'next'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'


interface WithAssignmentProps {

}

/**
 * Secures assignment pages
 * Stores assignment data
 * @param {WithAssignmentProps} props
 * @returns {(Component: NextPage) => (props: any) => (Promise<boolean>)}
 */
export const withAssignment = (props?: WithAssignmentProps) => (Component: NextPage) => {
   
   const Assignment = (props: any) => {
      const course = useCurrentCourse()
      const router = useRouter()
      const { assignment_id } = router.query
      const dispatch = useDispatch()
      const { isReallyStudent, isAssistantOrInstructor } = useUserRole()
      
      const { publishDateHelpers } = usePublishDateSetting()
      
      if (!assignment_id)
         return router.push(Utils.Url.accessDeniedLink(props.iid))
      
      const [fetchAssignment, assignment, isLoading] = useCachedLazyQuery('assignment', getLazyAssignment())
      
      const [displayPage, setDisplayPage] = useState<boolean>(false)
      
      useEffect(() => {
         assignment_id && fetchAssignment({ variables: { assignment_id: assignment_id as string } })
      }, [])
      
      // useEffect(() => {
      //    console.log(displayPage)
      // }, [displayPage])
      
      
      const isAvailable = assignment ? publishDateHelpers.isAvailable({
         status: assignment.gradebook_item?.status, availableFrom: assignment.gradebook_item?.available_from,
      }) : false
      
      useEffect(() => {
         if (!!assignment && ( isAvailable || !isReallyStudent )) {
            setDisplayPage(true)
            
         } else if (!isLoading && isReallyStudent && ( !assignment || !isAvailable )) {
            router.push(Utils.Url.accessDeniedLink(props.iid))
         }
         
      }, [assignment, isReallyStudent, isAvailable])
      
      return <Component {...props} displayPage={displayPage} />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      Assignment.getInitialProps = Component.getInitialProps
   }
   
   return Assignment
}
