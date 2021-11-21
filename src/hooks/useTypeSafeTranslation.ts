import { useTranslation } from 'react-i18next'

export const useTypeSafeTranslation = () => {
   const { t } = useTranslation(['common', 'course', 'form', 'alert'], { useSuspense: false })
   
   return t
}
