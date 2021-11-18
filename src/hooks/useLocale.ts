import { useTranslation } from 'react-i18next'

export const useLocale = () => {
   const { i18n } = useTranslation([], { useSuspense: false })
   return i18n.language as "fr" | "en"
}
