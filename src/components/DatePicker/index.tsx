import { START_DATE, useDatepicker } from '@datepicker-react/hooks'
import { Month } from '@slate/components/DatePicker/Month'
import { useDateFormatter } from '@slate/hooks/useDateFormatter'
import { DurationDateFormat } from '@slate/types/Course'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { ButtonGroup } from 'chalkui/dist/cjs/Components/Button/ButtonGroup'
import { Box } from 'chalkui/dist/cjs/Components/Layout/Box'
import { Flex } from 'chalkui/dist/cjs/Components/Layout/Flex'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import DatePickerContext from './DatePickerContext'

export interface DatepickerProps {
   template?: "vertical" | "horizontal",
   defaultSelectedDates?: DurationDateFormat,
   disableDatesBeforeToday?: boolean,
   onChange?: (data: DurationDateFormat) => void
   selectOneDate?: boolean
   showSelection?: boolean
}

export const DatePicker = (props: DatepickerProps) => {
   const { t } = useTranslation(['common'], { useSuspense: false })
   const { formatDate } = useDateFormatter()
   
   const {
      template = "horizontal",
      defaultSelectedDates = { startDate: null, endDate: null },
      disableDatesBeforeToday = false,
      selectOneDate = false,
      showSelection = true,
      onChange,
   } = props
   
   const defaultDates = ( defaultSelectedDates && defaultSelectedDates.startDate && defaultSelectedDates.endDate ) ?
      { startDate: defaultSelectedDates.startDate, endDate: defaultSelectedDates.endDate } : { startDate: null, endDate: null }
   
   const [state, setState] = useState<any>({
      startDate: defaultDates.startDate,
      endDate: defaultDates.endDate,
      focusedInput: START_DATE,
   })
   const {
      firstDayOfWeek,
      activeMonths,
      isDateSelected,
      isDateHovered,
      isFirstOrLastSelectedDate,
      isDateBlocked,
      isDateFocused,
      focusedDate,
      onDateHover,
      onDateSelect,
      onDateFocus,
      goToPreviousMonths,
      goToNextMonths,
   } = useDatepicker({
      startDate: state.startDate,
      endDate: state.endDate,
      minBookingDate: disableDatesBeforeToday ? new Date() : undefined,
      numberOfMonths: selectOneDate ? 1 : 2,
      exactMinBookingDays: selectOneDate,
      minBookingDays: selectOneDate ? 1 : undefined,
      // maxBookingDate: selectOneDate ? 1 : undefined,
      focusedInput: state.focusedInput,
      onDatesChange: handleDateChange,
   })
   
   function handleDateChange(data: any) {
      if (!data.focusedInput) {
         setState({ ...data, focusedInput: START_DATE })
      } else {
         setState(data)
      }
      onChange && onChange({ startDate: data.startDate, endDate: data.endDate })
   }
   
   return (
      <DatePickerContext.Provider
         value={{
            focusedDate,
            isDateFocused,
            isDateSelected,
            isDateHovered,
            isDateBlocked,
            isFirstOrLastSelectedDate,
            onDateSelect,
            onDateFocus,
            onDateHover,
         }}
      >
         {( showSelection && !selectOneDate ) && (
            <Box>
               <Box>
                  <strong>{t('date.Start date')}: </strong>
                  {/*{state.startDate && new Intl.DateTimeFormat(i18n.language, options).format(state.startDate)}*/}
                  {state.startDate && formatDate(state.startDate, 'long')}
               </Box>
               <Box>
                  <strong>{t('date.End date')}: </strong>
                  {state.endDate && formatDate(state.endDate, 'long')}
               </Box>
            </Box>
         )}
         
         <Flex justifyContent="center">
            <ButtonGroup isAttached colorScheme="primary" size="sm" my={4}>
               <NavButton onClick={goToPreviousMonths}>{t('date.Previous month')}</NavButton>
               <NavButton onClick={goToNextMonths}>{t('date.Next month')}</NavButton>
            </ButtonGroup>
         </Flex>
         
         <Box
            css={{
               display: "grid",
               gridTemplateColumns: template === 'horizontal' ? `repeat(${activeMonths.length}, 300px)` : 'auto',
               gridGap: template === 'horizontal' ? "1rem" : "1rem",
               maxWidth: template === "vertical" ? "350px" : "auto",
               margin: template === "vertical" ? "auto" : ".5rem auto auto",
               justifyContent: template === "horizontal" ? "center" : "",
            }}
         >
            {activeMonths.map(month => (
               <Month
                  key={`${month.year}-${month.month}`}
                  year={month.year}
                  month={month.month}
                  firstDayOfWeek={firstDayOfWeek}
               />
            ))}
         </Box>
      </DatePickerContext.Provider>
   )
   
}


export function NavButton({ children, onClick }: any) {
   return (
      <Button
         type="button"
         onClick={onClick}
      >
         {children}
      </Button>
   )
}

export default DatePicker
