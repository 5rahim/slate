import { BiMenuAltLeft } from '@react-icons/all-files/bi/BiMenuAltLeft'
import { RiDragDropLine } from '@react-icons/all-files/ri/RiDragDropLine'
import { ComponentVisibility } from "@slate/components/ComponentVisibility"
import { createRichTextEditorRef } from '@slate/components/RichTextEditor/utils'
// import { TestCreator } from '@slate/components/TestCreator'
import { EntityDrawer } from '@slate/components/UI/Course/EntityDrawer'
import { EditTestMutationVariables, Gradebook_Items, Tests } from '@slate/generated/graphql'
import { useEditTest } from '@slate/graphql/schemas/gradebook_items/hooks'
import { useAccommodationSetting } from '@slate/hooks/settings/useAccommodationSetting'
import { useAssignToSetting } from '@slate/hooks/settings/useAssignToSetting'
import { useAttemptSetting } from '@slate/hooks/settings/useAttemptSetting'
import { useDueDateSetting } from '@slate/hooks/settings/useDueDateSetting'
import { useGradingSetting } from '@slate/hooks/settings/useGradingSetting'
import { usePublishDateSetting } from '@slate/hooks/settings/usePublishDateSetting'
import { useQuestionSetting } from '@slate/hooks/settings/useQuestionSetting'
import { useTimeLimitSetting } from '@slate/hooks/settings/useTimeLimitSetting'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useStoreCache } from '@slate/store/cache/hooks/useStoreCache'
import { TestEditorActions } from '@slate/store/slices/testEditorSlice'
import { FormErrors } from '@slate/types/FormErrors'
import { FormControl, FormLabel } from 'chalkui/dist/cjs/Components/FormControl'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Input } from 'chalkui/dist/cjs/Components/Input'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { Menu, MenuItem, MenuList, MenuPanel, MenuPanels } from 'chalkui/dist/cjs/Components/Menu'
import dynamic from 'next/dynamic'
import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

const TestCreator = dynamic(() => import('@slate/components/TestCreator/index'))

export function TestEdit({ onClose, isOpen, data }: { onClose: any, isOpen: any, data: { gradebookItem: Gradebook_Items } }) {
   const dispatch = useDispatch()
   const cmf = useCMF()
   const editorRef = createRichTextEditorRef()
   const gradebookItem = data.gradebookItem
   const test = data.gradebookItem.test as Tests
   const t = useTypeSafeTranslation()
   const cache = useStoreCache()
   const course = useCurrentCourse()
   
   const [wait, setWait] = useState(false)
   const { publishDateValues, publishDateFields } = usePublishDateSetting({
      defaultValue: {
         availableFrom: gradebookItem.available_from,
         status: gradebookItem.status,
      },
   })
   const { dueDateValues, dueDateFields } = useDueDateSetting(gradebookItem.available_until)
   const { gradingValues, gradingFields } = useGradingSetting({
      scoringType: gradebookItem.scoring_type,
      maxPoints: gradebookItem.max_points as number,
   })
   const { attemptValues, attemptFields } = useAttemptSetting({
      attemptsAllowed: gradebookItem.attempts_allowed as number,
      attemptsGrading: gradebookItem.attempts_grading as string,
   })
   const { accommodationValues, accommodationFields } = useAccommodationSetting(gradebookItem.accommodations)
   const { textEditor } = useRichTextEditor(test.description, false)
   const { assignToValues, assignToFields } = useAssignToSetting(gradebookItem.assign_to)
   
   const { timeLimitValues, timeLimitFields } = useTimeLimitSetting(test.time_limit)
   const { questionSettingValues, questionSettingFields } = useQuestionSetting(test.settings)
   
   
   useEffect(() => {
      dispatch(TestEditorActions.setGradebookItem(gradebookItem)) // todo: delete
   }, [gradebookItem])
   
   const [editAssignment, isLoading] = useEditTest({
      onCompleted: () => {
         setWait(false)
      },
   })
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      defaultValues: {
         name: test.name,
      },
      schema: ({ z }) => z.object({
         name: z.string().min(4, FormErrors.RequiredField),
      }),
      onSubmit: async formData => {
         
         setWait(true)
         let update = false
         
         const update_data: EditTestMutationVariables = {
            gradebook_item_id: gradebookItem.id,
            assessment_id: test.id,
            assessment_type: 'test',
            course_id: course.id,
            ...publishDateValues,
            ...dueDateValues,
            ...gradingValues,
            ...assignToValues,
            ...attemptValues,
            ...accommodationValues,
            ...timeLimitValues,
            ...questionSettingValues,
            /** test **/
            test_id: test.id,
            name: formData.name,
            description: textEditor.getValue(),
         }
         
         update = true
         
         if (
            update
            && textEditor.isValid()
            && publishDateFields.isValid()
            && dueDateFields.isValid()
            && attemptFields.isValid()
            && accommodationFields.isValid()
            && assignToFields.isValid()
            && timeLimitFields.isValid()
            && questionSettingFields.isValid()
         ) {
            console.log(update_data)
            editAssignment(update_data)
         } else {
            setWait(false)
         }
         
      },
   })
   
   
   return (
      <ComponentVisibility.AssistantAndHigher>
         
         <EntityDrawer
            isOpen={isOpen}
            isLoading={isLoading || wait}
            onClose={onClose}
            onFormSubmit={onFormSubmit}
            // headerColor="brand.700"
            rawTitle={`${test.name}`}
            closeOnOverlayClick={true}
            settings={
               <>
                  {publishDateFields.render()}
                  {dueDateFields.render()}
                  {gradingFields.render()}
                  {assignToFields.render()}
                  {timeLimitFields.render()}
                  {questionSettingFields.render()}
                  {attemptFields.render()}
                  {accommodationFields.render()}
               </>
            }
         
         >
            
            <Menu colorScheme={cmf('primary', 'white')}>
               <MenuList>
                  <MenuItem fontSize="lg"><Icon as={RiDragDropLine} mr="1" />{t('course:Questions')}</MenuItem>
                  <MenuItem fontSize="lg"><Icon as={BiMenuAltLeft} mr="1" />{t('course:Details')}</MenuItem>
               </MenuList>
               
               <MenuPanels>
                  
                  <MenuPanel>
                     
                     <TestCreator test={test} />
                  
                  </MenuPanel>
                  
                  <MenuPanel mt="4" p="0">
                     
                     <FormControl mb={5} id="name" isRequired>
                        <FormLabel>{t('form:Name')}</FormLabel>
                        <Input
                           size="lg" fontSize="4xl" variant="flushed" {...fields.register('name', {
                           placeholder: 'Enter a name', required: true,
                        })} />
                        {fields.errorMessage('name')}
                     </FormControl>
                     
                     <Box mb="5">
                        {textEditor.render({ title: 'Instructions', height: 200 })}
                     </Box>
                  
                  </MenuPanel>
                  
               </MenuPanels>
            </Menu>
         
         
         </EntityDrawer>
      
      
      </ComponentVisibility.AssistantAndHigher>
   )
}

export default TestEdit
