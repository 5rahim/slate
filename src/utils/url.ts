 import Config from '../constants/Config'

export const Url = {
   
   baseLinkTo: (path: string) => `${Config.baseURL}${path}`,
   linkToLogin: (redirectTo?: string) => `${Config.baseURL}/api/auth/login${redirectTo ? '?redirectTo=' + redirectTo : ``}`,
   linkToLogout: (redirectTo?: string) => `${Config.baseURL}/api/auth/logout${redirectTo ? '?redirectTo=' + redirectTo : ``}`,
   schoolLinkTo: (iid: string | undefined, path: string) => `http://${Config.domain}/${iid}/u${path}`,
   accessDeniedLink: (iid: string | undefined) => Url.schoolLinkTo(iid, '/access-denied'),
   
   assetPath: (assetPath: string,
               folder?: string,
   ) => `/assets${folder ? ( assetPath.startsWith('/') ? `/${folder}` : `/${folder}/` ) : ''}${assetPath.startsWith('/')
      ? assetPath
      : `/${assetPath}`}`,
   /**
    * @example
    * Utils.Url.assetImageUrl('topography.png', 'patterns')
    * @param {string} assetPath
    * @param {string} folder
    * @returns url({string})
    */
   assetImageUrl: (assetPath: string, folder?: string) => `url(${Url.assetPath(assetPath, folder)})`,
   
}
