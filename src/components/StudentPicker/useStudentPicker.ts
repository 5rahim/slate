import { useState } from 'react'

/**
 * Default value from database
 * @param {string} defaultValue
 */
export const useStudentPicker = (defaultValue: string) => {
   
   const [selected, setSelected] = useState<number[]>(JSON.parse(defaultValue))
   
   // useEffect(() => {
   //    console.log(selected)
   // }, [selected])
   
   return {
      studentPickerProps: {
         defaultValue: JSON.parse(defaultValue) as number[],
         onSelected: ( (newValue: number[]) => setSelected(newValue) ) as ( (newValue: number[]) => any ),
      } as any, // Typescript error
   }
   
}
