import NProgress from "nprogress"
import Router from "next/router"
import "nprogress/nprogress.css"
import '../styles/wave.css'
import { Provider as ReduxProvider } from 'react-redux'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import store from '../store'
import { ChalkProvider } from 'chalkui/dist/cjs/React'
import theme from '../theme'
import React from "react"
import i18n from './i18n'
import { I18nextProvider } from 'react-i18next'
import { CookiesProvider } from 'react-cookie'
import { UserProvider } from '@auth0/nextjs-auth0'
import "@fontsource/assistant"
import "@fontsource/assistant/200.css"
import "@fontsource/assistant/300.css"
import "@fontsource/assistant/400.css"
import "@fontsource/assistant/500.css"
import "@fontsource/assistant/600.css"
import "@fontsource/assistant/700.css"
import "@fontsource/assistant/800.css"
// import { AuthMiddleware } from '../components/Middlewares/AuthMiddleware'


Router.events.on("routeChangeStart", () => {
   NProgress.start()
})
Router.events.on("routeChangeComplete", () => NProgress.done())
Router.events.on("routeChangeError", () => NProgress.done())

export default ({ Component, pageProps }: AppProps) => {
   
   return (
      <I18nextProvider i18n={i18n}>
         
         {/*<SessionProvider session={pageProps.session}>*/}
            
            <UserProvider>
   
               <ReduxProvider store={store}>
      
                  <ChalkProvider resetCSS theme={theme}>
         
                     <CookiesProvider>
            
                        <Component {...pageProps} />
         
                     </CookiesProvider>
      
                  </ChalkProvider>
   
               </ReduxProvider>
               
            </UserProvider>
         
         {/*</SessionProvider>*/}
      
      </I18nextProvider>
   )
}
