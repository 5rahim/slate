import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import { useEffect, useState } from 'react'

/**
 * Returns the date selected merged with the time selected from components
 * The date returned is localized (e.g: GMT-5)
 * It will be automatically converted to UTC when saved in database via Hasura
 * @example
 * const { value: publishOn, setDateField, setTimeField } = useDateAndTimeFields()
 * @returns {{setTimeField: (value: number) => void, setDateField: (value: any) => void}}
 */
export const useDateAndTimeFields = () => {
   
   const [date, setDate] = useState<Parameter<any>>(null)
   const [time, setTime] = useState<number>(0)
   
   const [dt, setDT] = useState<Parameter<Date>>(null)
   
   useEffect(() => {
      if(date) {
         setDT(Utils.Dates.mergeDateAndTime(date, time))
      } else {
         setDT(null)
      }
   }, [date, time])
   
   return {
      setDateField: (value: any) => setDate(value),
      setTimeField: (value: number) => setTime(value),
      resetDateAndTimeFields: () => {
        setDate(null)
        setTime(1439)
      },
      value: dt
   }
}
