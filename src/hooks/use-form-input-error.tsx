import { useCMF } from '@slate/hooks/use-color-mode-function'
import { useCourseTranslation } from '@slate/hooks/use-course-translation'
import { Parameter } from '@slate/types/Parameters'
import { SystemStyleObject, Text } from 'chalkui/dist/cjs/React'

export function useFormInputError() {
   
   const t = useCourseTranslation()
   const cmf = useCMF()
   
   return {
      inputError: (errorMessage: Parameter<string>, style?: SystemStyleObject) => {
         if (errorMessage) {
            return (
               <Text
                  color={cmf("red.500", "red.300")}
                  fontStyle="italic"
                  mt="1"
                  mb="2"
                  sx={{
                     ...style,
                  }}
               >
                  {t('form:' + errorMessage)}
               </Text>
            )
         }
         return <></>
      },
   }
   
}
