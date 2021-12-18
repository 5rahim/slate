import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { Parameter } from '@slate/types/Parameters'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Box, Flex, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useSelector } from 'react-redux'

interface SettingSectionProps {
   children?: React.ReactNode
   icon: any
   title?: Parameter<string>
   showAlertIcon?: boolean
   summary?: any
}

export const SettingSection = (props: SettingSectionProps) => {
   
   const { icon, title, showAlertIcon, children, summary } = props
   const cmf = useCMF()
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   return (
      <ListItem
         sx={{
            opacity: mutationIsLoading ? '.4' : '1',
            pointerEvents: mutationIsLoading ? 'none' : 'all',
         }}
      >
         <Flex alignItems="center" gridGap={3}>
            
            <Box as={icon} width="40px" fontSize="3rem" alignSelf="flex-start" />
            
            <Box fontSize="md" width="full">
               
               <Flex gridGap={2} alignItems="center" mb="1" mt="1">
                  
                  <Text fontSize="lg" fontWeight="700">
                     {title}
                  </Text>
                  
                  {showAlertIcon && (
                     <IconBox colorScheme="red.500" icon={<BiErrorCircle />} size="sm" />
                  )}
               
               </Flex>
               
               <Box width="full">
   
                  {summary && <Box mb="2">
                      <Text color={cmf("blue.500", "blue.500")} fontSize="lg">{summary}</Text>
                  </Box>}
                  
                  {children}
               </Box>
            
            </Box>
         
         </Flex>
      </ListItem>
   )
   
}
