import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { useMutateCourseBackgroundColor, useMutateCourseBannerColor } from '@slate/graphql/schemas/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box } from 'chalkui/dist/cjs/React'
import React from 'react'
import Circle from 'react-color/lib/components/circle/Circle'
import Swatches from 'react-color/lib/components/swatches/Swatches'
import { useTranslation } from 'react-i18next'
import { BiPalette } from 'react-icons/bi'

export function Customization() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   
   const [updateBannerColor] = useMutateCourseBannerColor()
   const [updateBackgroundColor] = useMutateCourseBackgroundColor()
   
   
   function handleBannerColorChange(value: any) {
      
      updateBannerColor({ id: course?.id, banner_color: value.hex })
      
   }
   
   function handleBackgroundColorChange(value: any) {
      
      updateBackgroundColor({ id: course?.id, background_color: value.hex })
      
   }
   
   
   return (
      <ModuleBox headerText="Customization" headerIcon={<BiPalette />}>
         <Accordion allowToggle>
            <AccordionItem>
               <h2>
                  <AccordionButton>
                     <Box flex="1" textAlign="left">
                        Banner color
                     </Box>
                     <AccordionIcon />
                  </AccordionButton>
               </h2>
               <AccordionPanel pb={4}>
                  <Flex
                     alignItems="center"
                     gridGap=".5rem"
                     mb={5}
                  >
                     Current color: <Box width="30px" height="30px" borderRadius="md" bgColor={course?.banner_color as string} />
                  </Flex>
                  <Swatches onChangeComplete={handleBannerColorChange} />
               </AccordionPanel>
            </AccordionItem>
            
            <AccordionItem>
               <h2>
                  <AccordionButton>
                     <Box flex="1" textAlign="left">
                        Background Color
                     </Box>
                     <AccordionIcon />
                  </AccordionButton>
               </h2>
               <AccordionPanel pb={4}>
                  <Flex
                     alignItems="center"
                     gridGap=".5rem"
                     mb={5}
                  >
                     Current color: <Box
                     width="30px" height="30px" borderRadius="md"
                     bgColor={course?.background_color as string}
                  />
                  </Flex>
                  <Circle
                     colors={['#f9f9f9', '#f5f2f0', '#bfbfbf', '#42454c', '#2a2928']}
                     onChangeComplete={handleBackgroundColorChange}
                  />
               </AccordionPanel>
            </AccordionItem>
         </Accordion>
      </ModuleBox>
   )
   
}
