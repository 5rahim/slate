import { DatePicker } from '@slate/components/DatePicker'
import { useLocale } from '@slate/hooks/useLocale'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { DurationDateFormat } from '@slate/types/Course'
import { Utils } from '@slate/utils'
import { AlertDialogCloseButton, InputLeftElement, InputProps } from 'chalkui/dist/cjs'
import {
   AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Input, InputGroup, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useState } from 'react'
import { BiCalendarAlt } from 'react-icons/bi'

interface DateInputProps {
   onChange?: any
}

export function DateInput({ onChange, ...rest }: DateInputProps & InputProps) {

   const t = useTypeSafeTranslation()
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

         <InputGroup>
            <InputLeftElement
               pointerEvents="none"
               children={<BiCalendarAlt />}
            />
            <Input
               placeholder={t('course:Select a date')}
               value={inputValue}
               onChange={() => setInputValue(inputValue)}
               onClick={onOpen}
               {...rest}
            />
         </InputGroup>

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
                  <DatePicker
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
