import { useCMF } from '@slate/hooks/useColorModeFunction'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { Parameter } from '@slate/types/Parameters'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'

export function useFormInputError() {
   
   const t = useTypeSafeTranslation()
   const cmf = useCMF()
   
   return {
      inputError: (errorMessage: Parameter<string>, style?: any) => {
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
