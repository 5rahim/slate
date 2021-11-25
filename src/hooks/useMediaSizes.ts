import { useMediaQuery } from 'chalkui/dist/cjs/React'

export const useMediaSizes = () => {
   return {
      isDesktop: useMediaQuery('(min-width: 1280px)')
   }
   
}
