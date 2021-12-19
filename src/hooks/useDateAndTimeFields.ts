import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import isValid from 'date-fns/isValid'
import { useEffect, useState } from 'react'

/**
 * Returns the date selected merged with the time selected from components
 * The date returned is localized (e.g: GMT-5)
 * It will be automatically converted to UTC when saved in database via Hasura
 * @example
 * const { value: publishOn, setDateField, setTimeField } = useDateAndTimeFields()
 * @returns {{setTimeField: (value: number) => void, setDateField: (value: any) => void}}
 */
export const useDateAndTimeFields = (defaultValue?: Parameter<string>) => {
   
   const [date, setDate] = useState<Parameter<any>>(Utils.Dates.getDateOnlyFromDate(defaultValue) ?? null)
   const [time, setTime] = useState<number>(Utils.Dates.getTimeInMinutesFromDate(defaultValue) ?? 0) // was 0
   
   const [dt, setDT] = useState<Parameter<Date>>()
   
   useEffect(() => {
      if(date) {
         setDT(Utils.Dates.mergeDateAndTime(date, time))
      } else {
         setDT(null)
      }
   }, [date, time])
   
   
   return {
      
      dateFieldProps: {
         // defaultSelectedDate: Utils.Dates.getDateOnlyFromDate(defaultValue) ?? new Date(),
         onChange: (value: any) => setDate(value)
      },
      
      timeFieldProps: {
         // defaultTime: Utils.Dates.getTimeInMinutesFromDate(defaultValue) ?? 1439,
         onChange: (value: number) => setTime(value)
      },
      
      isTouched: date !== null && isValid(date) && time !== null,
      
      setDateField: (value: any) => setDate(value),
      setTimeField: (value: number) => setTime(value),
      resetDateAndTimeFields: () => {
        setDate(null)
        setTime(1439)
      },
      value: dt
   }
}
