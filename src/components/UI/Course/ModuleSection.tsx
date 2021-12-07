import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { Parameter } from '@slate/types/Parameters'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Box, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useSelector } from 'react-redux'

interface ModuleSectionProps {
   children?: React.ReactNode
   icon: any
   title?: Parameter<string>
   showAlertIcon?: boolean
}

export const ModuleSection = (props: ModuleSectionProps) => {
   
   const { icon, title, showAlertIcon, children } = props
   
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   return (
      <ListItem
         sx={{
            opacity: mutationIsLoading ? '.4' : '1',
            pointerEvents: mutationIsLoading ? 'none' : 'all',
         }}
      >
         <Flex alignItems="center" gridGap={2}>
            
            <Box as={icon} width="40px" fontSize="1.6rem" alignSelf="flex-start" mt="2" />
            
            <Box fontSize="md" width="full">
               
               <Flex gridGap={2} alignItems="center">
                  
                  <Text fontSize="lg" fontWeight="700">
                     {title}
                  </Text>
                  
                  {showAlertIcon && (
                     <IconBox colorScheme="red.500" icon={<BiErrorCircle />} size="sm" />
                  )}
               
               </Flex>
               
               <Box width="full">
                  {children}
               </Box>
            
            </Box>
         
         </Flex>
      </ListItem>
   )
   
}
