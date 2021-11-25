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
   contentPadding?: number[] | number | string
} & BoxProps

export const ModuleBox = (props: CourseModuleBoxProps) => {
   
   const { headerIcon, headerText, children, headerAction, minimizeOnMobile = false, contentPadding = [3,3,3,5], ...rest } = props
   
   const { colorMode } = useColorMode()
   
   const { isOpen, onToggle, onOpen } = useDisclosure()
   
   const [isMobile] = useMediaQuery('(max-width: 754px)')
   const [isDesktop] = useMediaQuery('(min-width: 1280px)')
   
   useEffect(() => {
      console.log(isMobile, !minimizeOnMobile, isOpen)
   }, [isMobile, minimizeOnMobile, isOpen])
   
   return (
      <Box
         bgColor={colorMode === 'light' ? 'white' : '#1d1d1d'}
         borderRadius="md"
         boxShadow="sm"
         height="auto"
         width="100%"
         sx={{
            transition: 'all .15s linear',
            _hover: {
               boxShadow: isDesktop ? 'xl' : 'sm'
            }
         }}
         {...rest}
      >
         
         <Flex
            justifyContent="space-between"
            p={[4,4,4,5]}
            onClick={() => {
               onToggle()
            }}
         >
            
            <Flex alignItems="center" gridGap=".5rem">
               
               <Flex fontSize="1.5rem" alignItems="center">
                  {headerIcon && headerIcon}
               </Flex>
               
               <Text p={0} fontWeight="700" fontSize={["lg", "lg", "lg", "xl"]}>
                  {headerText}
               </Text>
            
            </Flex>
            
            <Flex>
               {headerAction}
            </Flex>
         
         </Flex>
         
         <Box px={contentPadding} pb={contentPadding} pt="0" display={( (isMobile && ( !minimizeOnMobile || isOpen )) || !isMobile ) ? 'block' : 'none'}>
            {children}
         </Box>
         
         {/*{( isMobile && ( !minimizeOnMobile || isOpen ) ) ? <Box pt={3}>{children}</Box> : <></>}*/}
         
         {/*{!isMobile && <Box pt={3}>{children}</Box>}*/}
      
      </Box>
   )
   
}
