import { Image } from 'chalkui/dist/cjs/Components/Image/Image'
import { Box, BoxProps, Center, Container } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface AuthLayoutOptions {
   children?: React.ReactNode
}

type AuthLayoutProps = AuthLayoutOptions & BoxProps


const AuthLayout: React.FC<AuthLayoutProps> = ({ children, ...rest }: AuthLayoutProps) => {
   
   const { t } = useTranslation(['common', 'contact'], { useSuspense: false })
   
   return (
      <>
         
         
         <Box
            // backgroundColor={'secondary'}
            backgroundImage={'url(/assets/patterns/topography.png)'}
            // backgroundBlendMode={'soft-light'}
            position="fixed"
            left="0"
            width="100%"
            height="100%"
            top="0"
            right="0"
            // display={['none', 'none', 'none', 'block']}
            alignItems="center"
         >
            
            <Container size="lg" pt={20}>
               
               <Center mb={5}>
                  <Image src={'/assets/logos/logo-slate-classroom.svg'} width={"100px"} />
               </Center>
               
               {children}
            
            </Container>
         
         </Box>
      
      </>
   )
   
}

export default AuthLayout
