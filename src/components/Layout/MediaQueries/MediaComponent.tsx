import { PermissionComponentProps } from '../../Permissions/Types'
import React from 'react'
import { Box } from 'chalkui/dist/cjs/React'

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
