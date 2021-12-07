import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { SimpleGrid } from 'chalkui/dist/cjs/Components/Layout/SimpleGrid'
import { Spinner } from 'chalkui/dist/cjs/Components/Spinner'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'

export const LoadingScreen = ({text}: any) => {
   
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
         
         <Spinner size="xl" />
         {text && <Text>{text}</Text>}
      
      </SimpleGrid>
   
   )
   
}
