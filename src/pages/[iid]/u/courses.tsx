import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { CoursesList } from '@slate/modules/Course/Shared/Courses/CoursesList'
import { Compose } from '@slate/next/compose'
import { Utils } from '@slate/utils'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Heading } from 'chalkui/dist/cjs/Components/Typography/Heading'
import React from 'react'


const Page = React.memo(() => {
   
   const t = useTypeSafeTranslation()
   
   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
         <UserDashboardLayout>
            
            <Flex
               height={["100px", "100px", "150px", "150px"]}
               backgroundColor={"brand.800"}
               backgroundImage={Utils.Url.assetImageUrl('topography.png', 'patterns')}
               backgroundBlendMode={"color-burn"}
               color="white"
            >
               
               <Box width={['90%', '90%', '90%', '90%']} margin="auto">
                  
                  <Box>
                     <Heading size="2xl">{t('Your courses')}</Heading>
                  </Box>
               </Box>
            
            </Flex>
            
            <Box p={5}>
               
               <CoursesList />
            
            </Box>
         
         
         </UserDashboardLayout>
      </>
   )
})

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
)(Page)

