import { useUserRole } from '@slate/hooks/useUserRole'
import { AppSelectors } from '@slate/store/slices/appSlice'
import React from 'react'
import { useSelector } from 'react-redux'
import { PermissionComponentProps } from './Types'

export const PermissionComponent = {
   StudentOnly: ({ children }: PermissionComponentProps) => {
      
      const { isStudent } = useUserRole()
      
      return isStudent ? <>{children}</> : <></>
      
   },
   
   
   InstructorOnly: ({ children }: PermissionComponentProps) => {
      
      const { isInstructor } = useUserRole()
      
      return isInstructor ? <>{children}</> : <></>
      
   },
   
   
   AssistantAndHigher: ({ children }: PermissionComponentProps) => {
      
      const { isAssistantOrInstructor } = useUserRole()
      
      return isAssistantOrInstructor ? <>{children}</> : <></>
      
   },
   
}

/**
 * Hides the item of a list in student view if condition specified is not met
 * @param {boolean} showIf
 * @param {React.ReactElement<any, string | React.JSXElementConstructor<any>> | string | number | {} | React.ReactNodeArray | React.ReactPortal |
 *    boolean | null | undefined} children
 * @returns {JSX.Element}
 * @constructor
 */
export const HideItemInStudentView = ({ conditionIsNotMet, children }: { conditionIsNotMet: boolean, children: React.ReactNode }) => {
   const { isStudent } = useUserRole()
   const studentView = useSelector(AppSelectors.studentView)
   if (studentView) {
      return ( isStudent && !conditionIsNotMet ) ? <>{children}</> : <></>
   } else {
      return <>{children}</>
   }
}
