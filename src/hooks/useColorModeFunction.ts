import { Parameter } from '@slate/types/Parameters'
import { useColorMode } from "chalkui/dist/cjs/ColorMode"

export const useCMF = () => {
   
   const { colorMode } = useColorMode()
   
   return (light: Parameter<string>, dark: Parameter<string>) => {
      return ( light && dark ) ? ( colorMode === 'light' ? light : dark ) : undefined
   }
   
}
