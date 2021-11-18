import { ApolloError } from '@apollo/client'
import { Utils } from '@slate/utils'

/**
 *
 * @param {ApolloError | undefined} error
 * @param {string} message
 * @param {boolean} debug
 */
export const handleApolloErrors = (error: ApolloError | undefined, message: string, debug: boolean, toast: any) => {
   
   process.env.NODE_ENV === 'development' && console.error("[QueryHook Error]: ", error)
   
   const additionalDetails = process.env.NODE_ENV === 'development' ? error?.message : "If the problem persists, contact Slate's support"
   
   toast.closeAll({ positions: ['top'] })
   
   if(!error?.toString().includes("JWT")) {
      
      toast({
         duration: 8000,
         title: message,
         status: "error",
         position: "top",
         description: additionalDetails,
      })
      
   } else {
      
      toast({
         duration: 5000,
         title: "Your session has expired",
         status: "error",
         isClosable: true,
         position: "top",
      })
      
      setTimeout(() => {
         window.location.href = Utils.Url.linkToLogout()
      }, 1000)
      
   }
   
   
}
