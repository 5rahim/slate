import { useMediaSizes } from '@slate/hooks/useMediaSizes'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box, Icon, Text, useDisclosure } from 'chalkui/dist/cjs/React'
import React from 'react'
import { BiCaretDown, BiCaretUp } from 'react-icons/bi'

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
   
   const { isDesktop, isTabletAndSmaller } = useMediaSizes()
   
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
            
            <Flex align="center">
               {headerAction}
               
               {minimizeOnMobile && isTabletAndSmaller && (
                  isOpen ? <Icon as={BiCaretDown} fontSize="xl" /> : <Icon as={BiCaretUp} fontSize="xl" />
               )}
            </Flex>
         
         </Flex>
         
         <Box
            px={contentPadding}
            pb={contentPadding}
            pt="0"
            display={( ( isTabletAndSmaller && ( !minimizeOnMobile || isOpen ) ) || !isTabletAndSmaller ) ? 'block' : 'none'}
         >
            {children}
         </Box>
      
      </Box>
   )
   
}
