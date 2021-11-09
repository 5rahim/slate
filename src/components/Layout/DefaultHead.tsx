import { Parameter } from '@slate/types/Parameters'
import Head from 'next/head'
import React from 'react'

interface DefaultHeadProps {
   pageTitle: Parameter<string>
}

export const DefaultHead: React.FC<DefaultHeadProps> = (props: DefaultHeadProps) => {
   
   return (
      <Head>
         <title>{props.pageTitle} | Slate</title>
      </Head>
   )
   
}
