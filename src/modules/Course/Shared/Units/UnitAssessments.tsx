import { BiEditAlt } from '@react-icons/all-files/bi/BiEditAlt'
import { BiEraser } from '@react-icons/all-files/bi/BiEraser'
import { MenuCelledList, MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Badge, Text } from 'chalkui/dist/cjs'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import React from 'react'

export function UnitAssessments() {
   
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   
   return (
      <>
   
         <Flex
            flexDirection={['column', 'column', 'row', 'row', 'row']}
            gridGap="1rem"
            placeItems="flex-start"
            mb="1rem"
         >
            <Flex
               p={[3,3,4,4,4]}
               width="100%"
               border="2px solid"
               borderColor={cmf("gray.200", 'gray.700')}
               borderRadius="xl"
               transition="all .15s linear"
               flexDirection="column"
               _hover={{
                  boxShadow: 'md'
               }}
            >
               <Flex>
                  <Box mr="3">
                     <IconBox size="lg" p="3" colorScheme="brand.700" variant="secondary" as={BiEraser}/>
                  </Box>
                  <Box width="100%">
                     <Text fontSize="2xl" fontWeight="bold">{t('Assignments')}</Text>
                     <Box width="100%">
                        <Text>2 assignment(s) due this week</Text>
                     </Box>
                  </Box>
               </Flex>
               <Box>
                  <MenuCelledList mt="2" width="100%">
               
                     <MenuCelledListItem>
                        <Flex justifyContent="space-between">
                           <Text>Groundwater experiment</Text>
                           <Badge>Done</Badge>
                        </Flex>
                     </MenuCelledListItem>
                     <MenuCelledListItem>
                        Igneous rocks Excel sheet
                     </MenuCelledListItem>
            
                  </MenuCelledList>
               </Box>
            </Flex>
            <Flex
               p={[3,3,4,4,4]}
               width="100%"
               border="2px solid"
               borderColor={cmf("gray.200", 'gray.700')}
               borderRadius="xl"
               transition="all .15s linear"
               flexDirection="column"
               _hover={{
                  boxShadow: 'md'
               }}
            >
               <Flex>
                  <Box mr="3">
                     <IconBox size="lg" p="3" colorScheme="brand.400" variant="secondary" as={BiEditAlt}/>
                  </Box>
                  <Box width="100%">
                     <Text fontSize="2xl" fontWeight="bold">{t('Assignments')}</Text>
                     <Box width="100%">
                        <Text>No quiz due this week</Text>
                     </Box>
                  </Box>
               </Flex>
            </Flex>
         </Flex>
         
      </>
   )
   
}
