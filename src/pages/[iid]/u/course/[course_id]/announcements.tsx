import { withPageAuthRequired } from '@auth0/nextjs-auth0'
import { HiOutlineSpeakerphone } from '@react-icons/all-files/hi/HiOutlineSpeakerphone'
import { ComponentVisibility } from '@slate/components/ComponentVisibility'
import { CourseLayout } from '@slate/components/Layout/CourseLayout'
import { ModuleBox } from '@slate/components/UI/Course/ModuleBox'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { withAuth } from '@slate/middlewares/auth/withAuth'
import { withCourse } from '@slate/middlewares/dashboard/withCourse'
import { withDashboard } from '@slate/middlewares/dashboard/withDashboard'
import { StudentOptions } from '@slate/modules/Course/Instructor/Settings/StudentOptions'
import { AnnouncementList } from '@slate/modules/Course/Shared/Announcements/AnnouncementList'
import { CourseContextMenu } from '@slate/modules/Course/Shared/CourseContextMenu'
import { Compose } from '@slate/next/compose'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { Box } from 'chalkui/dist/cjs/Components/Layout'
import { useDisclosure } from 'chalkui/dist/cjs/Hooks/use-disclosure'
import dynamic from 'next/dynamic'
import React from 'react'
import { useTranslation } from 'react-i18next'

const CourseOptions = dynamic(() => import('@slate/modules/Course/Instructor/Settings/CourseOptions'))
const Customization = dynamic(() => import('@slate/modules/Course/Instructor/Settings/Customization'))
const AnnouncementCreation = dynamic(() => import('@slate/modules/Course/Instructor/Announcements/AnnouncementCreation'))

const Page = React.memo(() => {
   const { t } = useTranslation(['common'], { useSuspense: false })
   const course = useCurrentCourse()
   const { isOpen: createIsOpen, onOpen: createOnOpen, onClose: createOnClose } = useDisclosure()
   
   
   return (
      <CourseLayout
         headerMenuIndex={1}
         pageTitle={course.name}
         leftPanel={
            <>
               
               <CourseContextMenu index={1} />
               
               <StudentOptions />
            
            </>
         }
      >
         
         <>
            <ModuleBox
               headerText={t('Announcements')}
               headerIcon={<HiOutlineSpeakerphone />}
               headerAction={
                  <ComponentVisibility.AssistantAndHigher>
                     <Box mb="3">
                        
                        <Button
                           borderRadius="2rem"
                           colorScheme="brand.100"
                           size="md"
                           onClick={createOnOpen}
                        >
                           {t('Create')}
                        </Button>
                        
                        {createIsOpen && <AnnouncementCreation isOpen={createIsOpen} onClose={createOnClose} />}
                     
                     </Box>
                  </ComponentVisibility.AssistantAndHigher>
               }
            >
               
               <AnnouncementList maxHeight="800px" />
            
            </ModuleBox>
            
            
         </>
      
      </CourseLayout>
   )
})

export default Compose(
   withApollo(),
   withPageAuthRequired,
   withAuth({ requireActiveAccount: true }),
   // withCacheReset(),
   withDashboard(),
   withCourse(),
)(Page)

