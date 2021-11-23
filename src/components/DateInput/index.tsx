import { DatePicker } from '@slate/components/DatePicker'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { useTypeSafeTranslation } from '@slate/hooks/useTypeSafeTranslation'
import { useUserSettings } from '@slate/hooks/useUserSettings'
import { DurationDateFormat } from '@slate/types/Course'
import { AlertDialogCloseButton, InputLeftElement, InputProps } from 'chalkui/dist/cjs'
import {
   AlertDialog, AlertDialogBody, AlertDialogContent, AlertDialogFooter, AlertDialogOverlay, Button, Input, InputGroup, useDisclosure,
} from 'chalkui/dist/cjs/React'
import React, { useEffect, useState } from 'react'
import { BiCalendarAlt } from 'react-icons/bi'

interface DateInputProps {
   onChange?: any,
   defaultSelectedDate?: any
}

export function DateInput({ onChange, defaultSelectedDate = null, ...rest }: DateInputProps & InputProps) {
   
   const t = useTypeSafeTranslation()
   const { formatDate } = useDateFormatter()
   const { dateFormat } = useUserSettings()
   
   const { isOpen, onOpen, onClose } = useDisclosure()
   
   const cancelRef: any = React.useRef()
   
   const [selectedDate, setSelectedDate] = useState<DurationDateFormat | null>(defaultSelectedDate)
   const [inputValue, setInputValue] = useState<string | undefined>('')
   
   useEffect(() => {
      if (defaultSelectedDate) {
         setInputValue(selectedDate?.startDate ? formatDate(selectedDate?.startDate, 'short') : '')
      }
   }, [dateFormat])
   
   function handleSaveDate() {
      setInputValue(selectedDate?.startDate ? formatDate(selectedDate?.startDate, 'short') : '')
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
