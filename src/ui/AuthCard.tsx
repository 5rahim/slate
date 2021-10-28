import { Box, BoxProps } from 'chalkui/dist/cjs/Components/Layout'
import React from 'react'
import { useTranslation } from 'react-i18next'

interface AuthCardOptions {
   title: string
}

type AuthCardProps = BoxProps & AuthCardOptions

const AuthCard: React.FC<AuthCardProps> = ({ title, children, ...rest }: AuthCardProps) => {
   
   return (
      <Box {...rest}>
         <Box
            p={5}
            bgColor={'secondary'}
            color={"white"}
            backgroundImage={'url(/assets/patterns/seigaiha.png)'}
            backgroundBlendMode={"color-burn"}
            fontSize={"xl"}
            boxShadow="xl"
         >
            {title}
         </Box>
         
         <Box bgColor="white">
            {children}
         </Box>
      </Box>
   )
   
}

export default AuthCard
