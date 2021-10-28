import { NextPage } from 'next'
import { useApolloClient } from '@apollo/client'


interface WithCacheResetProps {

}

export const withCacheReset = (props?: WithCacheResetProps) => (Component: NextPage) => {
   
   const CacheReset = (props: any) => {
      
      const client = useApolloClient()
      
      client.resetStore()
      
      return <Component {...props} />
      
      
   }
   
   // Copy getInitial props so it will run as well
   if (Component.getInitialProps) {
      CacheReset.getInitialProps = Component.getInitialProps
   }
   
   return CacheReset
}
