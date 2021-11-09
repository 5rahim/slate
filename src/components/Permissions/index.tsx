import React from 'react'
import { useCurrentUser, useUserSessionProfile } from '../../hooks/use-current-user'
import { PermissionComponentProps } from './Types'

export const PermissionComponent = {
   StudentOnly: ({ children }: PermissionComponentProps) => {
      
      const { profile } = useUserSessionProfile()
      
      return profile?.role === 'student' ? <>{children}</> : <></>
      
   },
   
   
   InstructorOnly: ({ children }: PermissionComponentProps) => {
   
      const { profile } = useUserSessionProfile()
      
      return profile?.role === 'instructor' ? <>{children}</> : <></>
      
   },
   
   
   AssistantAndHigher: ({ children }: PermissionComponentProps) => {
   
      const { profile } = useUserSessionProfile()
      
      return ['instructor', 'assistant'].includes(profile?.role as string) ? <>{children}</> : <></>
      
   },
   
}
