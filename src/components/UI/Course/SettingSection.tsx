import { BiErrorCircle } from '@react-icons/all-files/bi/BiErrorCircle'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { AppSelectors } from '@slate/store/slices/appSlice'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox'
import { Box, Flex, Link, ListItem } from 'chalkui/dist/cjs/Components/Layout'
import { Drawer, DrawerBody, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay } from 'chalkui/dist/cjs/Components/Modal/Drawer'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import React from 'react'
import { useSelector } from 'react-redux'

interface SettingSectionProps {
   children?: React.ReactNode
   icon: any
   title?: Parameter<string>
   showAlertIcon?: boolean
   summary?: any
   settingEdit?: React.ReactNode
}

export const SettingSection = (props: SettingSectionProps) => {
   const { icon, title, showAlertIcon, children, summary, settingEdit } = props
   const t = useTypeSafeTranslation()
   const {isOpen, onOpen, onClose} = useDisclosure()
   const cmf = useCMF()
   const mutationIsLoading = useSelector(AppSelectors.mutationIsLoading)
   
   return (
      <>
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
                         <Link color={cmf("blue.500", "blue.500")} fontSize="lg" onClick={() => !mutationIsLoading && onOpen()}>{summary}</Link>
                     </Box>}
                     
                     {children}
                     <Box display="none">
                        {settingEdit}
                     </Box>
                  </Box>
               
               </Box>
            
            </Flex>
         </ListItem>
   
         <Drawer
            size="md"
            isCentered
            isOpen={isOpen}
            onClose={onClose}
         >
            <DrawerOverlay />
               <DrawerContent>
                  {/*<IconBox isCircular icon={<BiAddToQueue />} colorScheme="primary" margin="0 auto" mt={3} />*/}
                  <DrawerHeader
                     fontSize="2rem"
                     fontWeight="bold"
                     backgroundImage={Utils.Url.assetImageUrl('memphis-mini.png', 'patterns')}
                     backgroundBlendMode={"color-burn"}
                     bgColor={cmf("primary", "primary")}
                     color="white"
                     borderBottom="2px solid"
                     borderColor={cmf("gray.200", "gray.500")}
                  >
                     {title}
                  </DrawerHeader>
            
                  <DrawerBody>
   
                     <Flex alignItems="center" gridGap={3}>
                        
                        <Box width="full">
                           {settingEdit}
                        </Box>
   
                     </Flex>
            
                  </DrawerBody>
            
                  <DrawerFooter gridGap={5}>
                     <Button
                        colorScheme="secondary"
                        width="100%"
                        type="submit"
                        onClick={onClose}
                     >
                        {t('Save')}
                     </Button>
                  </DrawerFooter>
               </DrawerContent>
         </Drawer>
         
      </>
   )
   
}
