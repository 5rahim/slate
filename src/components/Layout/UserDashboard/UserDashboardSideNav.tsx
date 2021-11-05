import { useColorMode } from 'chalkui/dist/cjs/ColorMode'
import { Box, BoxProps, Flex, Stack } from 'chalkui/dist/cjs/Components/Layout'
import { Icon, Image, Text } from 'chalkui/dist/cjs/React'
import { ComponentLink } from '../NavLink'
import { BiBook, BiCaretLeft, BiCaretRight, BiEnvelope, BiGlobe, BiHome, BiListCheck, BiLogOut } from 'react-icons/bi'
import { useSelector } from 'react-redux'
import { PermissionComponent } from '../../Permissions'
import React, { useState } from 'react'
import { Utils } from 'slate/utils'
import { SchoolSelectors } from 'slate/store/slices/schoolSlice'

const SideNavLink = ({ href, children, icon }: any) => (
   <ComponentLink href={href}>
      <Flex align="center" p={1}>
         <Box fontSize="1.4rem" fontWeight="800">
            <Box as={icon} mr={3} w="24px" />
         </Box>
         <Text>{children}</Text>
      </Flex>
   </ComponentLink>
)


type SideNavProps = BoxProps

export const UserDashboardSideNav = (props: SideNavProps) => {
   const { colorMode } = useColorMode()
   
   const [collapsed, setCollapsed] = useState<boolean>(false)
   
   const iid: any = useSelector(SchoolSelectors.getIID)
   
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
            pl={8}
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
                     
                     <PermissionComponent.StudentOnly>
                        <>
                           <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/activity")} icon={BiGlobe}>
                              {'Activity'}
                           </SideNavLink>
                           <SideNavLink href={Utils.Url.schoolLinkTo(iid, "/grades")} icon={BiListCheck}>
                              {'Grades'}
                           </SideNavLink>
                        </>
                     </PermissionComponent.StudentOnly>
                     
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
