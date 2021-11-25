import { useMediaQuery } from 'chalkui/dist/cjs/React'

export const useMediaSizes = () => {
   
    const [isDesktop] = useMediaQuery('(min-width: 1280px)')
   const [isSmallerDesktop] = useMediaQuery('(max-width: 80em)')
   const [isTabletAndSmaller] = useMediaQuery('(max-width: 62em)')
   
   return {
      isDesktop,
      isTabletAndSmaller,
      isSmallerDesktop
   }
   
}
