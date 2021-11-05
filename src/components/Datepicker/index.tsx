import { useState } from 'react'
import { START_DATE, useDatepicker } from '@datepicker-react/hooks'
import DatepickerContext from './DatepickerContext'
import { Box, ButtonGroup } from 'chalkui/dist/cjs/React'
import { Month } from 'slate/components/Datepicker/Month'
import { Button } from 'chalkui/dist/cjs/Components/Button'
import { DurationDateFormat } from 'slate/types/Course'
import { useTranslation } from 'react-i18next'
import { Utils } from 'slate/utils'

export interface DatepickerProps {
   template?: "vertical" | "horizontal",
   defaultSelectedDates?: DurationDateFormat,
   disableDatesBeforeToday?: boolean,
   onChange?: (data: DurationDateFormat) => void
}

export const Datepicker = (props: DatepickerProps) => {
   const { t, i18n } = useTranslation(['common'], { useSuspense: false })
   const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
   
   const {
      template = "horizontal",
      defaultSelectedDates = { startDate: null, endDate: null },
      disableDatesBeforeToday = false,
      onChange,
   } = props
   
   const defaultDates = (defaultSelectedDates && defaultSelectedDates.startDate && defaultSelectedDates.endDate) ?
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
      // maxBookingDate: 1,
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
      <DatepickerContext.Provider
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
         <div>
            <strong>{t('date.Start date')}: </strong>
            {/*{state.startDate && new Intl.DateTimeFormat(i18n.language, options).format(state.startDate)}*/}
            {state.startDate && Utils.Dates.formatDate(state.startDate, 'long', i18n.language)}
         </div>
         <div>
            <strong>{t('date.End date')}: </strong>
            {state.endDate && Utils.Dates.formatDate(state.endDate, 'long', i18n.language)}
         </div>
         
         <ButtonGroup isAttached colorScheme="primary" size="sm" my={4}>
            <NavButton onClick={goToPreviousMonths}>{t('date.Previous month')}</NavButton>
            <NavButton onClick={goToNextMonths}>{t('date.Next month')}</NavButton>
         </ButtonGroup>
         
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
      </DatepickerContext.Provider>
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
