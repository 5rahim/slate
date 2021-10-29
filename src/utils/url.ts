import Config from '../constants/Config'

export const Url = {
   getIID: () => {
      if(window) {
         const { host } = window.location
         let splitHost = host.split(".")
         return splitHost.length === 3 ? splitHost[0] : null
      } else {
         return null
      }
   },
   
   baseLinkTo: (path: string) => `${Config.baseURL}${path}`,
   linkToLogin: () => `${Config.baseURL}/api/auth/login`,
   schoolLinkTo: (iid: string, path: string) => `http://${Config.domain}/${iid}/u${path}`,
   accessDeniedLink: (iid: string) => Url.schoolLinkTo(iid, '/access-denied')
}
