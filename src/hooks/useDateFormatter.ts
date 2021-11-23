import { useLocale } from '@slate/hooks/useLocale'
import { useUserSettings } from '@slate/hooks/useUserSettings'
import { Parameter } from '@slate/types/Parameters'
import { Utils } from '@slate/utils'
import { format } from 'date-fns'
import { enUS, fr } from 'date-fns/locale'

const getLocale = (locale: string) => locale === 'fr' ? fr : enUS


type DateFormat = "short" | "long" | "short with hours" | "long with hours"

const hour_formats: any = {
   '12': 'HH:mm',
   '24': 'hh:mm a..aa',
}

const date_formats: { [key: string]: any } = {
   short: { DMY: "dd/MM/yy", MDY: "MM/dd/yy" },
   long: { DMY: "dd MMMM yyyy", MDY: "MMMM dd, yyyy" },
   'short with hours': {
      '12': {
         DMY: "dd/MM/yy 'at' hh:mm a",
         MDY: "MM/dd/yy 'at' hh:mm a",
      },
      '24': {
         DMY: "dd/MM/yy 'at' HH:mm",
         MDY: "MM/dd/yy 'at' HH:mm",
      },
   },
   'long with hours': {
      '12': {
         DMY: "dd MMMM yyyy 'at' hh:mm a",
         MDY: "MMMM dd, yyyy 'at' hh:mm a",
      },
      '24': {
         DMY: "dd MMMM yyyy 'at' HH:mm",
         MDY: "MMMM dd, yyyy 'at' HH:mm",
      },
   },
}

export const useDateFormatter = () => {
   
   const locale = useLocale()
   const settings = useUserSettings()
   
   return {
      formatDate: (utcDate: Parameter<Date | string>, selected_format: DateFormat) => {
         if(utcDate) {
            
            const d = typeof utcDate === 'string' ? Utils.Dates.asUTC(utcDate) : utcDate
            
            const formats = date_formats[selected_format]
            
            const date_format = settings.dateFormat ?? 'DMY'
            const hour_format = settings.hourFormat ?? '24'
            
            if(selected_format === 'short' || selected_format === 'long') {
               return format(d, (formats[date_format] as string).replace('at', locale === 'fr' ? '' : 'at'), { locale: getLocale(locale) })
            }
            if(selected_format === 'short with hours' || selected_format === 'long with hours') {
               return format(d, (formats[hour_format][date_format] as string).replace('at', locale === 'fr' ? 'à' : 'at'), { locale: getLocale(locale) })
            }
            
         } else {
            return 'N/A'
         }
      },
   }
   
}
