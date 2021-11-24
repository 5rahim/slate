import { Parameter } from '@slate/types/Parameters'
import { useColorMode } from "chalkui/dist/cjs/ColorMode"

export const useCMF = () => {
   
   const { colorMode } = useColorMode()
   
   return (light: Parameter<any>, dark: Parameter<any>) => {
      return ( light && dark ) ? ( colorMode === 'light' ? light : dark ) : undefined
   }
   
}
