import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { TestCreator } from '@slate/components/TestCreator'
import TestQuestionSidebar from '@slate/components/TestCreator/TestQuestionSidebar'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { Gradebook_Items, Tests } from '@slate/generated/graphql'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { TestEditorActions } from '@slate/store/slices/testEditorSlice'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

export function TestQuestions({ onClose, isOpen, data }: { onClose: any, isOpen: any, data: { gradebookItem: Gradebook_Items } }) {
   const cmf = useCMF()
   const gradebookItem = data.gradebookItem
   const test = data.gradebookItem.test as Tests
   const t = useTypeSafeTranslation()
   const course = useCurrentCourse()
   const dispatch = useDispatch()
   const [wait, setWait] = useState(false)
   
   useEffect(() => {
      dispatch(TestEditorActions.setGradebookItem(data.gradebookItem))
   }, [])
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={wait}
            onClose={onClose}
            titleColor={cmf('black', 'white')}
            rawTitle={test.name}
            closeOnOverlayClick={true}
            sidenav={
               <Box
                  position="relative"
                  width="100%"
               >
                  <TestQuestionSidebar gradebookItem={gradebookItem} />
               </Box>
            }
         >
            
            <TestCreator test={test} />
         
         </EntityDrawer>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default TestQuestions
