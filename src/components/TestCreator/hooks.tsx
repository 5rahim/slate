import { BiBracket } from '@react-icons/all-files/bi/BiBracket'
import { BiCheckDouble } from '@react-icons/all-files/bi/BiCheckDouble'
import { BiMessageAltDetail } from '@react-icons/all-files/bi/BiMessageAltDetail'
import { BiMessageCheck } from '@react-icons/all-files/bi/BiMessageCheck'
import { RiCheckboxLine } from '@react-icons/all-files/ri/RiCheckboxLine'
import { RiRecordCircleLine } from '@react-icons/all-files/ri/RiRecordCircleLine'
import { AlignedFlex } from '@slate/components/UI/AlignedFlex'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Parameter } from '@slate/types/Parameters'
import { Questions } from '@slate/types/TestQuestions'
import Icon from 'chalkui/dist/cjs/Components/Icon/Icon'
import { Tag } from 'chalkui/dist/cjs/Components/Tag/Tag'
import { Text } from 'chalkui/dist/cjs/Components/Typography'
import React from 'react'

export const testEditor_useHelpers = (testQuestionID: string) => {
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   
   return {
      
      renderType: (type: Parameter<string>) => {
         
         let icon
         let text
         
         switch (type) {
            case Questions.Multiple:
               icon = RiRecordCircleLine
               text = 'Multiple choice'
               break
            case Questions.Checkboxes:
               icon = RiCheckboxLine
               text = 'Checkboxes'
               break
            case Questions.TrueFalse:
               icon = RiRecordCircleLine
               text = 'True/False'
               break
            case Questions.ShortAnswer:
               icon = BiMessageCheck
               text = 'Short answer'
               break
            case Questions.Matching:
               icon = BiCheckDouble
               text = 'Matching questions'
               break
            case Questions.Essay:
               icon = BiMessageAltDetail
               text = 'Essay'
               break
            case Questions.Fill:
               icon = BiBracket
               text = 'Fill in the blanks'
               break
            default:
               return <></>
               break
         }
         
         return (
            <Tag mb="3" mt="2" p="2" colorScheme={cmf("primary", "gray.200")}>
               <AlignedFlex fontSize="md">
                  <Icon as={icon} />
                  <Text>{t(`course:${text}`)}</Text>
               </AlignedFlex>
            </Tag>
         )
         
      },
   }
}
