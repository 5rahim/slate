import { Box } from 'chalkui/dist/cjs/React'
import React from 'react'
import { ComponentVisibilityProps } from '../../ComponentVisibility/Types'

export const MediaComponent = {
   HideOnMobile: ({ children }: ComponentVisibilityProps) => {
      
      return <Box
         display={['none', 'none', 'block', 'block', 'block']}
      >
         {children}
      </Box>
      
   },
   ShowOnMobileOnly: ({ children }: ComponentVisibilityProps) => {
      
      return <Box
         display={['block', 'block', 'none', 'none', 'none']}
      >
         {children}
      </Box>
      
   },
   ShowOnTabletAndSmaller: ({ children }: ComponentVisibilityProps) => {
      
      return <Box
         display={['block', 'block', 'block', 'none', 'none']}
      >
         {children}
      </Box>
      
   },
   
}
