import { useColorMode } from "chalkui/dist/cjs/ColorMode"

export const useCMF = () => {
   
   const { colorMode } = useColorMode()
   
   return (light: string, dark: string) => colorMode === 'light' ? light : dark
   
}
