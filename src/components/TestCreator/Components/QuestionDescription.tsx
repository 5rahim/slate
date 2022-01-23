import QuestionEditableText from '@slate/components/TestCreator/Components/QuestionEditableText'
import { useTestCreatorQuestion } from '@slate/components/TestCreator/Provider'
import React, { useEffect } from 'react'

interface QuestionDescriptionProps {
   // data: Test_Questions,
   isEditing: boolean
}

const QuestionDescription: React.FC<QuestionDescriptionProps> = (props) => {
   const { testQuestion, updateDescription } = useTestCreatorQuestion()
   const { children, isEditing, ...rest } = props
   
   useEffect(() => {
      updateDescription(testQuestion?.question?.content.description)
   }, [testQuestion])
   
   return (
      <>
         <QuestionEditableText
            isSelected={isEditing}
            defaultValue={testQuestion?.question?.content.description}
            onChange={(v: string) => {
               updateDescription(v)
            }}
         />
      </>
   )
   
}

export default QuestionDescription
