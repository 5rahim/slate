import { BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/React'
import React from 'react'

export function AlignedFlex({ ...rest }: { children?: React.ReactNode } & BoxProps) {
   return (
      <Box
         display="flex"
         alignItems="center"
         gridGap=".5rem"
         {...rest}
      />
   )
}
