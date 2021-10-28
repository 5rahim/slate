import { PermissionComponentProps } from '../../Permissions/Types'
import React from 'react'
import { Box } from 'chalkui/dist/cjs/React'

export const MediaComponent = {
   HideOnMobile: ({ children }: PermissionComponentProps) => {
      
      return <Box
         display={['none', 'block', 'block', 'block', 'block']}
      >
         {children}
      </Box>
      
   },
   
}
