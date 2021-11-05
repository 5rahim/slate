import Head from 'next/head'
import React from 'react'
import { Parameter } from 'slate/types/Parameters'

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
