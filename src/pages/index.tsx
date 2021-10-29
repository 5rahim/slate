import { withApollo } from '../graphql/withApollo'
import React from 'react'
import { Compose } from '../next/compose'
import { DefaultHead } from '../components/Layout/DefaultHead'
import { useTranslation } from 'react-i18next'


const Page = () => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })

   
   return (
      <>
         <DefaultHead pageTitle={t('Slate')} />
   
         
      </>
   )
}

export default Compose(
   withApollo({ ssr: true }),
)(Page)

