import { Box, Container } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'
import { SimpleGrid, Spinner } from 'chalkui/dist/cjs/React'
import { Flex } from 'chalkui/dist/esm/Components/Layout'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'

export const LoadingScreen = () => {
   
   const { colorMode } = useColorMode()
   
   return (
      
      <SimpleGrid
         backgroundColor={colorMode === 'light' ? 'gray.200' : 'gray.800'}
         position="fixed"
         left="0"
         width="100%"
         height="100%"
         top="0"
         right="0"
         alignItems="center"
         alignContent="center"
         justifyContent="center"
         justifyItems="center"
         zIndex="9999"
      >
         
         <Spinner size="xl"/>
      
      </SimpleGrid>
   
   )
   
}
