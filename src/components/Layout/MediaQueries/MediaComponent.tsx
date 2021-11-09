import { Box } from 'chalkui/dist/cjs/React'
import React from 'react'
import { PermissionComponentProps } from '../../Permissions/Types'

export const MediaComponent = {
   HideOnMobile: ({ children }: PermissionComponentProps) => {
      
      return <Box
         display={['none', 'none', 'block', 'block', 'block']}
      >
         {children}
      </Box>
      
   },
   ShowOnMobileOnly: ({ children }: PermissionComponentProps) => {
      
      return <Box
         display={['block', 'block', 'none', 'none', 'none']}
      >
         {children}
      </Box>
      
   },
   
}
