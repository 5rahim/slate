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
   linkToLogin: (redirectTo?: string) => `${Config.baseURL}/api/auth/login${redirectTo ? '?redirectTo=' + redirectTo : ``}`,
   linkToLogout: (redirectTo?: string) => `${Config.baseURL}/api/auth/logout${redirectTo ? '?redirectTo=' + redirectTo : ``}`,
   schoolLinkTo: (iid: string | undefined, path: string) => `http://${Config.domain}/${iid}/u${path}`,
   accessDeniedLink: (iid: string | undefined) => Url.schoolLinkTo(iid, '/access-denied')
}
