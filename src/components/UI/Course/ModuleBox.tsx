import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Text, useDisclosure, useMediaQuery } from 'chalkui/dist/cjs/React'
import React, { useEffect } from 'react'

type CourseModuleBoxProps = {
   headerIcon?: React.ReactNode
   headerText: string,
   headerAction?: React.ReactNode
   children?: React.ReactNode
   minimizeOnMobile?: boolean
} & BoxProps

export const ModuleBox = (props: CourseModuleBoxProps) => {
   
   const { headerIcon, headerText, children, headerAction, minimizeOnMobile = false, ...rest } = props
   
   const { colorMode } = useColorMode()
   
   const { isOpen, onToggle, onOpen } = useDisclosure()
   
   const [isMobile] = useMediaQuery('(max-width: 754px)')
   
   useEffect(() => {
       console.log(isMobile, !minimizeOnMobile, isOpen)
   }, [isMobile, minimizeOnMobile, isOpen])
   
   return (
      <Box
         bgColor={colorMode === 'light' ? 'white' : '#1d1d1d'}
         borderRadius="md"
         p={[2,2,2,3]}
         boxShadow="sm"
         height="100%"
         {...rest}
      >
         
         <Flex justifyContent="space-between"
               onClick={() => {
                  console.log('toggle')
                  onToggle()
               }}
         >
            
            <Flex alignItems="center" gridGap=".5rem">
               
               <Flex fontSize="1.5rem" alignItems="center">
                  {headerIcon && headerIcon}
               </Flex>
               
               <Text p={0} fontWeight="700" fontSize={["lg" ,"lg", "lg", "xl"]}>
                  {headerText}
               </Text>
            
            </Flex>
            
            <Flex>
               {headerAction}
            </Flex>
         
         </Flex>
         
         {(isMobile && (!minimizeOnMobile || isOpen)) ? <Box pt={3}>{children}</Box> : <></>}
         
         {!isMobile && <Box pt={3}>{children}</Box>}
      
      </Box>
   )
   
}
