import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import UserDashboardLayout from '@slate/components/Layout/UserDashboard/UserDashboardLayout'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { Compose } from '@slate/next/compose'
import { DashboardPage } from '@slate/types/Next'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { Text } from 'chalkui/dist/cjs/Components/Typography/Text'
import React from 'react'
import { useTranslation } from 'react-i18next'


const Page = ({ user, school }: DashboardPage) => {
   
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   
   
   return (
      <>
         <DefaultHead pageTitle={t('Dashboard')} />
         
         <UserDashboardLayout width="full" mx="auto" p={3}>
            {/*<IndexHeader />*/}
            
            <Box>
               <Flex fontSize="1.6rem">
                  <Text fontWeight="700">Hello, {user?.first_name}.</Text>&nbsp;Welcome back
               </Flex>
            </Box>
            
            <Box>
               <ComponentVisibility.StudentOnly>
                  Join a course
               </ComponentVisibility.StudentOnly>
            </Box>
         
         </UserDashboardLayout>
      </>
   )
}

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   withDashboard(),
)(Page)

