import { RiPencilRuler2Line } from '@react-icons/all-files/ri/RiPencilRuler2Line'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { SettingList } from '@slate/components/UI/Course/SettingList'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Utils } from '@slate/utils'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { ListItem, Stack, StackDivider } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import {
   Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, DrawerProps,
} from 'chalkui/dist/cjs/Components/Modal/Drawer'
import React from 'react'

type EntityDrawerProps = {
   isOpen: boolean
   isLoading: boolean
   onClose: any
   onFormSubmit?: any
   title?: string
   rawTitle?: string
   entityTitle?: string
   headerColor?: string
   titleColor?: string
   children?: React.ReactNode
   settings?: React.ReactNode
   sidenav?: React.ReactNode
} & DrawerProps

export const EntityDrawer = ({
                                isOpen, isLoading, onClose, headerColor, onFormSubmit, children,
                                settings, sidenav, titleColor, title, rawTitle, entityTitle, ...rest
                             }: EntityDrawerProps) => {
   const cmf = useCMF()
   const t = useTypeSafeTranslation()
   
   return (
      <Drawer
         closeOnOverlayClick={false}
         // size="xl"
         isCentered
         isOpen={isOpen}
         onClose={() => !( isLoading ) && onClose()}
         {...rest}
      >
         <DrawerOverlay />
         <form onSubmit={onFormSubmit}>
            <DrawerContent maxWidth="90rem">
               {!isLoading && <DrawerCloseButton color={headerColor ? "white" : "black"} />}
               {/*<IconBox isCircular icon={<BiAddToQueue />} colorScheme="primary" margin="0 auto" mt={3} />*/}
               <DrawerHeader
                  fontSize="2rem"
                  fontWeight="bold"
                  backgroundImage={Utils.Url.assetImageUrl('topography.png', 'patterns')}
                  backgroundBlendMode={"color-burn"}
                  bgColor={headerColor ?? cmf("transparent", "gray.700")}
                  color={titleColor ?? ( headerColor ? "white" : 'black' )}
                  borderBottom="2px solid"
                  borderColor={cmf("gray.200", "gray.500")}
               >
                  {title && t(`course:options.${title}`)}
                  {rawTitle && rawTitle}
               </DrawerHeader>
               
               <DrawerBody
                  position="relative"
                  sx={{
                     userSelect: isLoading ? 'none' : 'auto',
                     pointerEvents: isLoading ? 'none' : 'auto',
                     opacity: isLoading ? '.5' : '1',
                  }}
               >
                  
                  <Stack
                     divider={<StackDivider borderColor={cmf("gray.200", "gray.500")} />}
                     spacing={4}
                     direction={["column", "column", "column", "row", "row"]}
                  >
                     
                     <Box
                        position="relative"
                        width="100%"
                        minHeight={["100%", "100%", "100%", "calc(100vh - 220px)", "calc(100vh - 220px)"]}
                     >
                        
                        {entityTitle && <Box fontSize="1.5rem" borderBottom="1px solid" borderColor={cmf("gray.200", "gray.500")} mb="4" pb="2">
                           {entityTitle}
                        </Box>}
                        
                        {children}
                     </Box>
                     
                     
                     <Box
                        maxHeight="calc(100vh - 220px)"
                        overflowY="auto"
                        width={["100%", "100%", "100%", "40%", "40%"]}
                     >
                        
                        {sidenav && sidenav}
                        
                        {settings && <SettingList>
                            <ListItem fontSize="1.5rem">
                                <AlignedFlex>
                                    <Icon as={RiPencilRuler2Line} />
                                   {t('Settings')}
                                </AlignedFlex>
                            </ListItem>
                           
                           {settings}
                        </SettingList>}
                     
                     </Box>
                  
                  </Stack>
               
               </DrawerBody>
               
               {onFormSubmit && <DrawerFooter gridGap={5}>
                   <Button
                       colorScheme="primary"
                       width="100%"
                       type="submit"
                       isLoading={isLoading}
                   >
                      {t('Save')}
                   </Button>

                   <Button isDisabled={isLoading} colorScheme="brand.800" onClick={onClose} width="50%">
                      {t('Cancel')}
                   </Button>
               </DrawerFooter>}
            </DrawerContent>
         </form>
      </Drawer>
   )
   
}
