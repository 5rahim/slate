import { useTranslation } from 'react-i18next'

export const useCourseTranslation = () => {
   const { t } = useTranslation(['common', 'course', 'form'], { useSuspense: false })
   
   return t
}
