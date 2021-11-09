import { PermissionComponent } from "@slate/components/Permissions"
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import {
   Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Text, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'

export function AnnouncementCreation() {
   
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   return (
      <PermissionComponent.AssistantAndHigher>
         
         <Box mb="3">
            
            <Button
               borderRadius="2rem"
               colorScheme="brand.100"
               size="md"
               onClick={onOpen}
            >
               Create
            </Button>
         
         </Box>
         
         
         <Drawer
            isOpen={isOpen}
            placement="right"
            onClose={onClose}
            // finalFocusRef={btnRef}
            size="xl"
         >
            <DrawerOverlay>
               <DrawerContent>
                  <DrawerCloseButton color="white" />
                  <DrawerHeader bg="brand.200" color="white" fontSize="2xl">
                     Create an announcement
                  </DrawerHeader>
                  
                  <DrawerBody>
                  
                  </DrawerBody>
                  
                  <DrawerFooter borderTopWidth="1px">
                     <Button boxShadow="sm" colorScheme="primary" variant="outline" mr={2} onClick={onClose}>
                        Cancel
                     </Button>
                     <Button colorScheme="primary">Save</Button>
                  </DrawerFooter>
               </DrawerContent>
            </DrawerOverlay>
         </Drawer>
      
      </PermissionComponent.AssistantAndHigher>
   )
}
