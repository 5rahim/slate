import { Box, BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import { useColorModeValue } from 'chalkui/dist/cjs/React'
import React from 'react'

export const Card: React.FC<BoxProps> = (props: BoxProps) => {
   
   return (
      <Box
         boxShadow="0 2px 3px 0px rgb(0 0 0 / 5%)"
         border="1px solid"
         borderRadius="5px"
         borderColor={useColorModeValue('gray.200', 'gray.600')}
         backgroundColor={useColorModeValue('#fff', 'gray.800')}
         {...props}
      >
      
      </Box>
   )
   
}


export const CardContent: React.FC<BoxProps> = (props: BoxProps) => {
   
   return (
      <Box
         padding="1rem"
         {...props}
      >
      
      </Box>
   )
   
}



