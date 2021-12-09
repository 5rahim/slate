import { useContext, useEffect } from "react"
import { useCookies } from 'react-cookie'
import { VaultSessionContext, VaultSessionContextProps } from "./VaultSessionProvider"

export const useApideckVaultSession = () => {
   
   const [cookies, setCookie, removeCookie] = useCookies()
   
   const storedJWT = cookies['vaultJWT']
   const storedToken = cookies['vaultToken']
   
   const { createSession, session, setSession, isLoading, jwt, token } = useContext(VaultSessionContext) as VaultSessionContextProps
   
   useEffect(() => {
      if ((storedJWT && storedToken) || (jwt && token)) {
         setSession({ ...(storedToken ?? token), jwt: (storedJWT ?? jwt) })
      }
   }, [storedJWT, setSession, storedToken])
   
   return {
      createSession,
      session,
      isSessionValid: !!session?.jwt,
      isLoading
   }
   
}
