import { BiAddToQueue } from '@react-icons/all-files/bi/BiAddToQueue'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { Tests } from '@slate/generated/graphql'
import { useAddAssessmentToUnitMutation } from '@slate/graphql/schemas/units/hooks'
import { useCurrentUnit } from '@slate/hooks/useCurrentUnit'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl'
import { IconBox } from 'chalkui/dist/cjs/Components/IconBox/IconBox'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import {
   AlertDialog, AlertDialogBody, AlertDialogCloseButton, AlertDialogContent, AlertDialogHeader, AlertDialogOverlay,
} from 'chalkui/dist/cjs/Components/Modal/AlertDialog'
import { Select } from 'chalkui/dist/cjs/Components/Select'
import React, { useEffect, useRef, useState } from 'react'

interface UnitModuleAddTestProps {
   isOpen: boolean
   onClose: any
}

export const UnitModuleAddTest = ({ isOpen, onClose }: UnitModuleAddTestProps) => {
   
   const t = useTypeSafeTranslation()
   const cancelRef: any = useRef()
   const cache = useStoreCache()
   const selectRef: any = useRef()
   const unit = useCurrentUnit()
   
   
   const [tests, setTests] = useState<Tests[]>([])
   
   useEffect(() => {
      console.log(unit)
      unit.course?.gradebook_items?.map((gi) => {
         gi?.test && setTests(a => {
            const test = gi.test
            if(test) {
               return [...a.filter((e) => e?.id !== gi?.test?.id), test]
            } else {
               return a
            }
         })
      })
   }, [unit])
   
   const [addAssessment, mutationLoading] = useAddAssessmentToUnitMutation({
      onCompleted: () => {
         onClose()
      }
   })
   
   function handleMoveModule() {
      if(!selectRef.current.value || !(selectRef.current.value.length > 0)) return
      addAssessment({
         type: 'test',
         unit_id: unit.id,
         assessment_id: selectRef.current.value
      })
   }
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={() => !mutationLoading && onClose()}
            isOpen={isOpen}
            size="xl"
            isCentered
         >
            <AlertDialogOverlay />
            
            <AlertDialogContent width="100%">
               <AlertDialogCloseButton />
               <Flex width="100%">
                  <IconBox fontSize="2xl" colorScheme="primary" isCircular icon={<BiAddToQueue />} mt={4} ml={4} position="absolute" />
                  <Box pl="3.5rem" width="100%">
                     <AlertDialogHeader>{t('course:Add test to unit')}</AlertDialogHeader>
                     <AlertDialogBody pb="6">
                        
                        <FormControl id="country" mb="2">
                           <Select ref={selectRef}>
                              {tests?.filter((a) => !unit.assessments.map((s) => s.test?.id).includes(a.id)).map((test) => {
                                 return <option key={test.id} value={test.id}>{test.name}</option>
                              })}
                           </Select>
                        </FormControl>
                        
                        <Flex justifyContent="flex-end">
                           <Button
                              onClick={() => handleMoveModule()}
                              colorScheme="brand.100"
                              isDisabled={mutationLoading}
                           >
                              {t('Add')}
                           </Button>
                        </Flex>
                     
                     </AlertDialogBody>
                  </Box>
               </Flex>
            </AlertDialogContent>
         </AlertDialog>
      </ComponentVisibility.AssistantAndHigher>
   )
   
}

export default UnitModuleAddTest
