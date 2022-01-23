import { RichTextContent } from '@slate/components/UI/RichTextContent'
import { useRichTextEditor } from '@slate/hooks/useRichTextEditor'
import { Parameter } from '@slate/types/Parameters'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'

interface QuestionEditableTextProps {
   isSelected: boolean
   defaultValue: Parameter<string>
   onChange?: any
}

const QuestionEditableText: React.FC<QuestionEditableTextProps> = (props) => {
   const dispatch = useDispatch()
   const { children, isSelected, onChange, defaultValue, ...rest } = props
   const { textEditor, content } = useRichTextEditor(defaultValue, true, true)
   
   useEffect(() => {
      // dispatch(onChange(content))
      
      if (onChange && content?.length !== 0) {
         dispatch(onChange(content?.length === 0 ? defaultValue : content))
      }
      
   }, [content])
   
   return (
      <>
         {
            isSelected ?
               textEditor.render({ height: 110 })
               : (
                  <RichTextContent forceFontSize="md" content={defaultValue ?? ""} />
               )
         }
      </>
   )
   
}

export default QuestionEditableText
