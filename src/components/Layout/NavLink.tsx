import { useRouter } from 'next/router'
import NextLink, { LinkProps } from 'next/link'
import React, { cloneElement, forwardRef } from 'react'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Box } from 'chalkui/dist/cjs/Components/Layout'

type NavLinkProps = LinkProps & {
   children?: React.ReactNode
}

const NavLink: React.FC<NavLinkProps> = ({ children, ...props }: NavLinkProps) => {
   const router = useRouter()
   let isActive = false
   const p1 = router.pathname.slice(router.pathname.lastIndexOf('/u'))
   const p2 = props.href.toString().slice(props.href.toString().lastIndexOf('/u'))
   
   if (p1 === p2 || p1 + '/' === p2) {
      isActive = true
   }
   
   return (
      <NextLink passHref {...props}>
         {typeof children === 'function' ? children(isActive) : children}
      </NextLink>
   )
}

export const stringToUrl = (str: string, path = '/') => {
   return `${path}${str
      .toLowerCase()
      .split(' ')
      .join('-')}`
}

export const SideNavLink = forwardRef(({ children, icon, ...props }: any, ref) => {
   const { colorMode } = useColorMode()
   return (
      <Box
         ref={ref}
         as="a"
         display="flex"
         cursor="pointer"
         align="center"
         px="6"
         py="2"
         transition="all 0.2s"
         fontWeight="700"
         fontSize='1.1rem'
         outline="none"
         // _focus={{ shadow: 'outline' }}
         color={colorMode === 'light' ? 'gray.400' : 'gray.300'}
         _notFirst={{ mt: 1 }}
         {...props}
      >
         {icon && <Box style={{ fontSize: '1.6rem' }}>{cloneElement(icon, { mr: 4, fontSize: '1.6rem' })}</Box>}
         <Box>{children}</Box>
      </Box>
   )
})

export const TopNavLink = forwardRef(({ href, ...props }: any, ref) => {
   return (
      <NavLink href={href}>
         {(isActive: boolean) => (
            <SideNavLink
               ref={ref}
               aria-current={isActive ? 'page' : undefined}
               _hover={{ color: !isActive ? 'inherit' : null }}
               {...(isActive && { color: 'teal.500', fontWeight: 'semibold' })}
               {...props}
            />
         )}
      </NavLink>
   )
})

export const ComponentLink = forwardRef(({ href, ...props }: any, ref) => {
   const { colorMode } = useColorMode()
   
   return (
      <NavLink href={href}>
         {(isActive: any) => (
            <SideNavLink
               ref={ref}
               aria-current={isActive ? 'page' : undefined}
               _hover={{
                  color: colorMode === 'light' ? 'white' : 'whiteAlpha.900'
                  // transform: 'translateX(2px)',
               }}
               {...(isActive && {
                  // bgColor: colorMode === 'light' ? 'blackAlpha.100' : 'whiteAlpha.100',
                  bgColor: colorMode === 'light' ? '#343434' : 'whiteAlpha.100',
                  color: colorMode === 'light' ? 'white' : 'white',
                  fontWeight: '700',
                  _hover: {},
               })}
               {...props}
            />
         )}
      </NavLink>
   )
})
