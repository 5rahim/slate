import React from 'react'
import { useCurrentUser } from '../../hooks/use-current-user'
import { PermissionComponentProps } from './Types'

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
      
      return ['instructor', 'assistant'].includes(user.role as string) ? <>{children}</> : <></>
      
   },
   
}
