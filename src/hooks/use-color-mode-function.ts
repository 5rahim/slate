import { useColorMode } from "chalkui/dist/cjs/ColorMode"
import { Parameter } from 'slate/types/Parameters'

export const useCMF = () => {
   
   const { colorMode } = useColorMode()
   
   return (light: Parameter<string>, dark: Parameter<string>) => {
      return (light && dark) ? (colorMode === 'light' ? light : dark) : undefined
   }
   
}
