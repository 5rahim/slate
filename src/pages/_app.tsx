import { UserProvider } from '@auth0/nextjs-auth0'
import "@fontsource/assistant"
import "@fontsource/assistant/200.css"
import "@fontsource/assistant/300.css"
import "@fontsource/assistant/400.css"
import "@fontsource/assistant/500.css"
import "@fontsource/assistant/600.css"
import "@fontsource/assistant/700.css"
import "@fontsource/assistant/800.css"
import { ChalkProvider } from 'chalkui/dist/cjs/React/ChalkProvider'
import type { AppProps } from 'next/app'
import Router from "next/router"
import NProgress from "nprogress"
import "nprogress/nprogress.css"
import { CookiesProvider } from 'react-cookie'
import { I18nextProvider } from 'react-i18next'
import { Provider as ReduxProvider } from 'react-redux'
import store from '../store'
import '../styles/wave.css'
import theme from '../theme'
import i18n from './i18n'
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
