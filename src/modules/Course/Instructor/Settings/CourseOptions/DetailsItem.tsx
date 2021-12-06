import { BiBookAlt } from '@react-icons/all-files/bi/BiBookAlt'
import { MenuCelledListItem } from '@slate/components/UI/MenuCelledList'
import { useMutateCourseDetails } from '@slate/graphql/schemas/courses/hooks'
import { useCurrentCourse } from '@slate/hooks/useCurrentCourse'
import { useFormCreator } from '@slate/hooks/useFormCreator'
import {
   Button, FormControl, FormLabel, IconBox, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React from 'react'
import { useTranslation } from 'react-i18next'

export function DetailsItem() {
   const { t } = useTranslation(['common', 'course'], { useSuspense: false })
   
   const { isOpen: detailsModalIsOpen, onOpen: openDetailsModal, onClose: closeDetailsModal } = useDisclosure()
   
   const course = useCurrentCourse()
   const [updateCourseDetails, updateIsLoading] = useMutateCourseDetails()
   
   const { onFormSubmit, fields, formState } = useFormCreator({
      schema: ({ z, errorMessage }) => z.object({
         name: z.string().min(4, errorMessage),
         level: z.string().nullable(),
         description: z.string().nullable(),
      }),
      defaultValues: {
         name: course.name,
         level: course.level,
         description: course.description,
      },
      onSubmit: data => {
         updateCourseDetails({ ...data, id: course?.id })
      },
   })
   
   return (
      <>
         <MenuCelledListItem onClick={openDetailsModal}>
            {t('course:options.Course details')}
         </MenuCelledListItem>
         
         <Modal size="xl" isOpen={detailsModalIsOpen} onClose={closeDetailsModal}>
            <ModalOverlay />
            <ModalContent>
               <IconBox isCircular icon={<BiBookAlt />} colorScheme="primary" margin="0 auto" mt={3} />
               <ModalHeader textAlign="center">{t('course:options.Change details about the course')}</ModalHeader>
               <form onSubmit={onFormSubmit}>
                  <ModalBody>
                     
                     
                     <FormControl mb={3} id="name" isRequired={true}>
                        <FormLabel>{t('form:Name')}</FormLabel>
                        <Input {...fields.register('name', { placeholder: 'Name' })} />
                        {fields.errorMessage('name')}
                     </FormControl>
                     
                     
                     <FormControl mb={3} id="level">
                        <FormLabel>{t('form:Level')}</FormLabel>
                        <Input
                           {...fields.register("level", { placeholder: 'Level' })}
                        />
                     </FormControl>
                     
                     <FormControl mb={3} id="description">
                        <FormLabel>{t('form:Description')}</FormLabel>
                        <Input
                           {...fields.register("description", { placeholder: 'Description' })}
                        />
                     </FormControl>
                  
                  
                  </ModalBody>
                  
                  <ModalFooter gridGap={5}>
                     <Button
                        colorScheme="brand.100"
                        width="100%"
                        type="submit"
                        isDisabled={!formState.touched}
                        isLoading={updateIsLoading}
                     >
                        {t('Save')}
                     </Button>
                     <Button colorScheme="brand.800" onClick={closeDetailsModal} isFullWidth>
                        {t('Cancel')}
                     </Button>
                  </ModalFooter>
               </form>
            </ModalContent>
         </Modal>
      </>
   )
}
