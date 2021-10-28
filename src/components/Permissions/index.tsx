import { PermissionComponentProps } from './Types'
import React from 'react'
import { useCurrentUser } from '../../hooks/use-current-user'

export const PermissionComponent = {
   StudentOnly: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return user.role === 1 ? <>{children}</> : <></>
      
   },
   
   
   InstructorOnly: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return user.role === 4 ? <>{children}</> : <></>
      
   },
   
   
   GraderAndHigherOnly: ({ children }: PermissionComponentProps) => {
      
      const user = useCurrentUser()
      
      return user.role >= 2 ? <>{children}</> : <></>
      
   },
   
}
