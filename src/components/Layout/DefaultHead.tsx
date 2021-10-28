import React from 'react'
import Head from 'next/head'

interface DefaultHeadProps {
   pageTitle: string
}

export const DefaultHead: React.FC<DefaultHeadProps> = (props: DefaultHeadProps) => {
   
   return (
      <Head>
         <title>{props.pageTitle} | Slate</title>
      </Head>
   )
   
}
