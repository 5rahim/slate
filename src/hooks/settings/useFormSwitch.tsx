import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl/FormControl'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Switch } from 'chalkui/dist/cjs/Components/Switch'
import React, { useState } from 'react'

export const useFormSwitch = (name: string, defaultIsChecked: boolean) => {
   const t = useTypeSafeTranslation()
   const [isChecked, setIsChecked] = useState<boolean>(defaultIsChecked)
   
   return [
      {
         isChecked: () => isChecked,
         
         getSummary: (or: string) => isChecked ? t(`course:${name}`) + ' - ' :  t(`course:${or}`) ,
         
         getSwitch: () => {
            return (
               <FormControl display='flex' alignItems='center' justifyContent="space-between">
                  <FormLabel htmlFor={name} mb='0'>
                     {t(`course:${name}`)}
                  </FormLabel>
                  <Switch
                     id={name}
                     isChecked={isChecked}
                     onChange={(e) => setIsChecked(e.target.checked)}
                  />
               </FormControl>
            )
         }
      }
   ]
   
}
