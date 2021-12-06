import { BiCopy } from '@react-icons/all-files/bi/BiCopy'
import { BiLink } from '@react-icons/all-files/bi/BiLink'
import { ModuleSection } from '@slate/components/UI/Course/ModuleSection'
import { useMutateCourseCode } from '@slate/graphql/schemas/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useCurrentUser } from '@slate/hooks/useCurrentUser'
import { Flex } from 'chalkui/dist/cjs/Components/Layout'
import {
   Dropdown, DropdownButton, DropdownItem, DropdownList, IconButton, Link, Text, Tooltip, useClipboard, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function AccessCodeItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const course = useCurrentCourse()
   const user = useCurrentUser()
   
   const { isOpen: accessCodeViewIsOpen, onToggle: toggleAccessCodeView } = useDisclosure()
   
   const { onCopy } = useClipboard(course?.access_code ?? '')
   
   const [updateCourseCode] = useMutateCourseCode()
   
   
   function handleChangeCourseCode() {
      if (course && user.first_name && user.last_name) {
         updateCourseCode({
            id: course.id,
            code: user.first_name.charAt(0).toUpperCase() + user.last_name.charAt(0).toUpperCase() + Math.floor(100000 + Math.random() * 900000),
         })
      }
   }
   
   function handleDeleteCourseCode() {
      toggleAccessCodeView()
      course && updateCourseCode({
         id: course.id,
         code: null,
      })
   }
   
   
   return (
      <ModuleSection
         icon={BiLink}
         title={t('course:Access Code')}
         showAlertIcon={!course?.access_code}
      >
         
         <>
            <Flex>
               <Text mr="2">{t(course?.access_code ? "course:options.code.yes" : "course:options.code.no")} </Text>
               {course?.access_code ?
                  (
                     <>
                        <Link onClick={toggleAccessCodeView}>{accessCodeViewIsOpen ? t('Close') : t('View')}</Link>
                     </>
                  )
                  :
                  (
                     <Dropdown>
                        <DropdownButton as={Link} colorScheme={'gray.100'}>
                           {t('Create')}
                        </DropdownButton>
                        <DropdownList>
                           <DropdownItem
                              onClick={handleChangeCourseCode}
                           >{t('course:options.Create a new access code')}
                           </DropdownItem>
                        </DropdownList>
                     </Dropdown>
                  )
               }
            </Flex>
            
            {( accessCodeViewIsOpen && course?.access_code )
            &&
            ( <Flex gridGap=".5rem">
               <Text fontSize="xl">{course?.access_code}</Text>
               <Tooltip label={t('course:options.Copy the access code')}>
                  <IconButton size="sm" icon={<BiCopy />} aria-label="" onClick={onCopy} />
               </Tooltip>
               
               <Dropdown>
                  <DropdownButton as={Link} colorScheme={'gray.100'}>
                     {t('course:options.Change the access code')}
                  </DropdownButton>
                  <DropdownList>
                     <DropdownItem
                        onClick={handleChangeCourseCode}
                     >{t('course:options.Create a new access code')}
                     </DropdownItem>
                     <DropdownItem
                        onClick={handleDeleteCourseCode}
                     >{t('Delete')}
                     </DropdownItem>
                  </DropdownList>
               </Dropdown>
            </Flex> )}
         </>
      
      </ModuleSection>
   )
   
}
