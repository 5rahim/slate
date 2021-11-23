import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Text } from 'chalkui/dist/cjs/React'
import React from 'react'

interface CourseModuleBoxProps {
   headerIcon?: React.ReactNode
   headerText: string,
   headerAction?: React.ReactNode
   children?: React.ReactNode
}

export const ModuleBox = (props: CourseModuleBoxProps) => {
   
   const { headerIcon, headerText, children, headerAction } = props
   
   const { colorMode } = useColorMode()
   
   return (
      <Box
         bgColor={colorMode === 'light' ? 'white' : '#1d1d1d'}
         borderRadius="md"
         p={5}
         boxShadow="sm"
         height="100%"
      >
         
         <Flex pb={3} justifyContent="space-between">
            <Flex alignItems="center" gridGap=".5rem">
               <Flex fontSize="1.5rem" alignItems="center">
                  {headerIcon && headerIcon}
               </Flex>
               <Text p={0} fontWeight="700" fontSize="2xl">
                  {headerText}
               </Text>
            </Flex>
            <Flex>
               {headerAction}
            </Flex>
         </Flex>
         
         {children}
      
      </Box>
   )
   
}
