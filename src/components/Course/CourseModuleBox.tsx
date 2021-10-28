import { Box, Text } from 'chalkui/dist/cjs/React'
import React from 'react'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'

interface CourseModuleBoxProps {
   headerIcon?: React.ReactNode
   headerText: string,
   children?: React.ReactNode
}

export const CourseModuleBox = (props: CourseModuleBoxProps) => {
   
   const { headerIcon, headerText, children } = props
   
   const { colorMode } = useColorMode()
   
   return (
      <Box
         bgColor={colorMode === 'light' ? 'white' : '#1d1d1d'}
         borderRadius="md"
         p={5}
         boxShadow="sm"
         height="100%"
      >
   
         <Flex alignItems="center" pb={3} gridGap=".5rem">
            <Flex fontSize="1.5rem" alignItems="center">
               {headerIcon && headerIcon}
            </Flex>
            <Text p={0} fontWeight="700" fontSize="2xl">
               {headerText}
            </Text>
         </Flex>
         
         {children}
         
      </Box>
   )
   
}
