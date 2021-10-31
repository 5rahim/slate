import { PermissionComponentProps } from './Types'
import React from 'react'
import { useCurrentUser } from '../../hooks/use-current-user'

export const PermissionComponent = {
   StudentOnly: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return user.role === 'student' ? <>{children}</> : <></>
      
   },
   
   
   InstructorOnly: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return user.role === 'instructor' ? <>{children}</> : <></>
      
   },
   
   
   AssistantAndHigher: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return ['instructor', 'assistant'].includes(user.role) ? <>{children}</> : <></>
      
   },
   
}
