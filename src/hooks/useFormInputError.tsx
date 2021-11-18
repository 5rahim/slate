import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Parameter } from '@slate/types/Parameters'
import { SystemStyleObject, Text } from 'chalkui/dist/cjs/React'

export function useFormInputError() {
   
   const t = useTypeSafeTranslation()
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
