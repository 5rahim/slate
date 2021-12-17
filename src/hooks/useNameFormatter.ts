import { useLocale } from '@slate/hooks/useLocale'
import { Utils } from '@slate/utils'

export const useNameFormatter = () => {
   
   const locale = useLocale()
   
   return {
      formatFullName: (user: any) => {
         return !!user ? Utils.Names.formatLocaleFullName(locale, user) : `??`
      }
   }
   
}
