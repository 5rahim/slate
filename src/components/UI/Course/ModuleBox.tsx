import { useMediaSizes } from '@slate/hooks/useMediaSizes'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Icon, Text, useDisclosure, useMediaQuery } from 'chalkui/dist/cjs/React'
import React, { useEffect } from 'react'
import { BiCaretDown } from 'react-icons/all'

type CourseModuleBoxProps = {
   headerIcon?: React.ReactNode
   headerText: string,
   headerAction?: React.ReactNode
   children?: React.ReactNode
   minimizeOnMobile?: boolean
   contentPadding?: number[] | number | string
} & BoxProps

export const ModuleBox = (props: CourseModuleBoxProps) => {
   
   const { headerIcon, headerText, children, headerAction, minimizeOnMobile = false, contentPadding = [3, 3, 3, 5], ...rest } = props
   
   const { colorMode } = useColorMode()
   
   const { isOpen, onToggle, onOpen } = useDisclosure()
   
   const [isSmallerScreen] = useMediaQuery('(max-width: 995px)')
   const { isDesktop } = useMediaSizes()
   
   useEffect(() => {
      console.log(isSmallerScreen, !minimizeOnMobile, isOpen)
   }, [isSmallerScreen, minimizeOnMobile, isOpen])
   
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
               boxShadow: isDesktop ? 'xl' : 'sm',
            },
         }}
         {...rest}
      >
         
         <Flex
            justifyContent="space-between"
            p={[4, 4, 4, 5]}
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
               
               {minimizeOnMobile && isSmallerScreen && <Icon as={BiCaretDown} fontSize="xl" />}
            </Flex>
         
         </Flex>
         
         <Box
            px={contentPadding}
            pb={contentPadding}
            pt="0"
            display={( ( isSmallerScreen && ( !minimizeOnMobile || isOpen ) ) || !isSmallerScreen ) ? 'block' : 'none'}
         >
            {children}
         </Box>
      
      </Box>
   )
   
}
