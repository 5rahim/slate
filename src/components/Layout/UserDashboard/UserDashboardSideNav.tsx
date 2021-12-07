import { BiBook } from '@react-icons/all-files/bi/BiBook'
import { BiCaretLeft } from '@react-icons/all-files/bi/BiCaretLeft'
import { BiCaretRight } from '@react-icons/all-files/bi/BiCaretRight'
import { BiEnvelope } from '@react-icons/all-files/bi/BiEnvelope'
import { BiGlobe } from '@react-icons/all-files/bi/BiGlobe'
import { BiHome } from '@react-icons/all-files/bi/BiHome'
import { BiListCheck } from '@react-icons/all-files/bi/BiListCheck'
import { BiLogOut } from '@react-icons/all-files/bi/BiLogOut'
import { useCurrentSchool } from '@slate/hooks/useCurrentSchool'
import { Utils } from '@slate/utils'
import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Icon } from 'chalkui/dist/cjs/Components/Icon'
import { Image } from 'chalkui/dist/cjs/Components/Image'
import { Box, BoxProps, Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React, { useState } from 'react'
import { ComponentVisibility } from '../../ComponentVisibility'
import { ComponentLink } from '../NavLink'

const SideNavLink = ({ href, children, icon }: any) => (
   <ComponentLink href={href}>
      <Flex justifyContent="center" flexDirection="column">
         <Flex justifyContent="center" fontSize="1.4rem" fontWeight="800">
            <Box as={icon} w="24px" />
         </Flex>
         <Text fontSize="1rem">{children}</Text>
      </Flex>
   </ComponentLink>
)


type SideNavProps = BoxProps

export const UserDashboardSideNav = (props: SideNavProps) => {
   const { colorMode } = useColorMode()
   
   const [collapsed, setCollapsed] = useState<boolean>(false)
   
   const { iid } = useCurrentSchool()
   
   return (
      <Box
         backgroundColor={colorMode === 'light' ? '#222121' : 'gray.800'}
         position="fixed"
         left="0"
         width="100%"
         height="100%"
         top="0"
         right="0"
         {...props}
      >
         
         <Flex
            height={"60px"}
            // justifyContent="center"
            justifyContent="center"
            alignItems="center"
            color="white"
            // flexDirection="column"
         >
            <Image src={'/assets/logos/logo.svg'} width={"60px"} fill={"#FFFFFF"} filter="invert(1)" />
            {/*for students*/}
         </Flex>
         
         <Box position="relative" overflowY="auto">
            <Box>
               <Flex justify="space-between" direction="column" height="calc(100vh - 4rem)" fontSize="sm">
                  <Stack spacing={0} mb={8}>
                     <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/")} icon={BiHome}>
                        {'Home'}
                     </SideNavLink>
                     <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/courses")} icon={BiBook}>
                        {'Courses'}
                     </SideNavLink>
                     
                     <ComponentVisibility.StudentOnly>
                        <>
                           <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/activity")} icon={BiGlobe}>
                              {'Activity'}
                           </SideNavLink>
                           <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/grades")} icon={BiListCheck}>
                              {'Grades'}
                           </SideNavLink>
                        </>
                     </ComponentVisibility.StudentOnly>
                     
                     <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/messages")} icon={BiEnvelope}>
                        {'Messages'}
                     </SideNavLink>
                     
                     <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/messages")} icon={BiLogOut}>
                        {'Sign out'}
                     </SideNavLink>
                  </Stack>
                  <Box
                     color={"#fff"}
                     fontSize="2rem"
                     p={3}
                  >
                     <Icon
                        as={collapsed ? BiCaretRight : BiCaretLeft}
                        mr={3}
                        onClick={() => setCollapsed(!collapsed)}
                        sx={{
                           cursor: 'pointer',
                           transition: 'all .15s linear',
                           _hover: {
                              transform: "scale(1.4)",
                           },
                        }}
                     />
                  </Box>
               </Flex>
            </Box>
         </Box>
      
      </Box>
   )
}
