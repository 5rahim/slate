import { BiCaretDown } from '@react-icons/all-files/bi/BiCaretDown'
import { BiCaretUp } from '@react-icons/all-files/bi/BiCaretUp'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useMediaSizes } from '@slate/hooks/useMediaSizes'
import { Utils } from '@slate/utils'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'
import { BoxProps, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React from 'react'

type CourseModuleBoxProps = {
   headerIcon?: React.ReactNode
   headerText?: string,
   headerAction?: React.ReactNode
   headerStyle?: boolean
   headerColor?: string
   children?: React.ReactNode
   minimizeOnMobile?: boolean
   contentPadding?: number[] | number | string
} & BoxProps

export const ModuleBox = (props: CourseModuleBoxProps) => {
   const cmf = useCMF()
   const {
      headerStyle, headerColor, headerIcon, headerText, children, headerAction, minimizeOnMobile = false, contentPadding = [3, 3, 3, 5], ...rest
   } = props
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
            backgroundImage={headerStyle ? Utils.Url.assetImageUrl('topography.png', 'patterns') : undefined}
            backgroundBlendMode={"color-burn"}
            bgColor={headerColor ?? cmf("transparent", "transparent")}
            justifyContent="space-between"
            borderTopLeftRadius="md"
            borderTopRightRadius="md"
            p={[4, 4, 4, 5]}
            onClick={() => {
               onToggle()
            }}
         >
            
            {headerText && (
               <>
                  <Flex color={headerColor ? 'white' : cmf('black', 'white')} alignItems="center" gridGap=".5rem">
                     
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
               </>
            )}
         
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
