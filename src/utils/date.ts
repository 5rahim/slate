import { DurationDateFormat } from '@slate/types/Course'
import { format } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

const getLocale = (locale: string) => locale === 'fr' ? fr : enUS

type DateFormat = "short" | "long" | "short with hours" | "long with hours"

const formats: { [key: string]: string } = {
   short: 'dd/mm/yyyy',
   long: 'dd MMMM yyyy',
}

export const Dates = {
   /**
    *
    * @param {Date} startDate
    * @param {Date} endDate
    * @returns {DurationDateFormat}
    */
   toDurationDateObject: (startDate: Date, endDate: Date): DurationDateFormat => {
      return {
         startDate: startDate,
         endDate: endDate,
      }
   },
   
   /**
    *
    * @param {DurationDateFormat} date
    * @returns {string}
    */
   durationDateObjectToString: (date: DurationDateFormat | null) => {
      return date ? JSON.stringify(date) : JSON.stringify({ startDate: null, endDate: null })
   },
   
   /**
    *
    * @param {string} date
    * @returns {DurationDateFormat}
    */
   parseDurationDateObject: (date: string | null | undefined): DurationDateFormat => {
      return date ? {
         startDate: new Date(JSON.parse(date).startDate),
         endDate: new Date(JSON.parse(date).endDate),
      } : { startDate: null, endDate: null }
   },
   
   formatDate(date: Date, s: DateFormat, locale: string) {
      if (formats[s] && date) {
         return format(date, formats[s], { locale: getLocale(locale) })
      } else {
         return ''
      }
   },
   
   /**
    * @deprecated
    * @param {Date[]} dates
    * @returns {any}
    */
   getScheduleObjectFromSelectorDates(dates: Date[]) {
      if (dates) {
         let schedule: any[] = []
         
         for (const date of dates) {
            schedule = [...schedule, { day: format(date, 'iiii'), hours: [format(date, 'H:mm:ss')] }]
         }
         
         return schedule.length > 0 ? schedule?.reduce((a, v) => {
            if (a[v.day]) {
               a[v.day].hours = [...a[v.day].hours, ...v.hours]
            } else {
               a[v.day] = v
            }
            return a
            
         }, {}) : null
      } else {
         return null
      }
   },
}
