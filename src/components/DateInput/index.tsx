import { Datepicker } from '@slate/components/Datepicker'
import { useCourseTranslation } from '@slate/hooks/use-course-translation'
import { useLocale } from '@slate/hooks/use-locale'
import { DurationDateFormat } from '@slate/types/Course'
import { Utils } from '@slate/utils'
import { AlertDialogCloseButton, InputProps } from 'chalkui/dist/cjs'
import {
   AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Input, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useState } from 'react'

interface DateInputProps {
   onChange?: any
}

export function DateInput({ onChange, ...rest }: DateInputProps & InputProps) {
   
   const t = useCourseTranslation()
   const locale = useLocale()
   
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   const cancelRef: any = React.useRef()
   
   const [selectedDate, setSelectedDate] = useState<DurationDateFormat | null>()
   const [inputValue, setInputValue] = useState<string | undefined>('')
   
   function handleSaveDate() {
      setInputValue(selectedDate?.startDate ? Utils.Dates.formatDate(selectedDate?.startDate, 'short', locale) : '')
      onChange && onChange(selectedDate?.startDate)
      onClose()
   }
   
   return (
      <>
         <Input placeholder={t('course:Select a date')} value={inputValue} onChange={() => setInputValue(inputValue)} onClick={onOpen} {...rest} />
         
         <AlertDialog
            motionPreset="slideInBottom"
            leastDestructiveRef={cancelRef}
            onClose={onClose}
            isOpen={isOpen}
            isCentered
         >
            <AlertDialogOverlay />
            
            <AlertDialogContent>
               {/*<AlertDialogHeader>Discard Changes?</AlertDialogHeader>*/}
               <AlertDialogCloseButton />
               <AlertDialogBody>
                  <Datepicker
                     defaultSelectedDates={selectedDate ?? undefined}
                     onChange={(data) => setSelectedDate(data)}
                     disableDatesBeforeToday
                     selectOneDate
                  />
               </AlertDialogBody>
               <AlertDialogFooter>
                  <Button colorScheme="primary" variant="outline" ref={cancelRef} onClick={onClose}>
                     {t('Cancel')}
                  </Button>
                  <Button colorScheme="primary" ml={3} onClick={handleSaveDate}>
                     {t('Save')}
                  </Button>
               </AlertDialogFooter>
            </AlertDialogContent>
         </AlertDialog>
      
      </>
   )
   
}
