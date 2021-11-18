import { useDay } from '@datepicker-react/hooks'
import DatePickerContext from '@slate/components/DatePicker/DatePickerContext'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { Button } from "chalkui/dist/cjs/Components/Button"
import React, { useContext, useRef } from "react"

export function Day({ dayLabel, date }: any) {
   const cmf = useCMF()
   const dayRef = useRef(null)
   const {
      focusedDate,
      isDateFocused,
      isDateSelected,
      isDateHovered,
      isDateBlocked,
      isFirstOrLastSelectedDate,
      onDateSelect,
      onDateFocus,
      onDateHover,
   } = useContext(DatePickerContext)
   const {
      isSelected,
      isSelectedStartOrEnd,
      isWithinHoverRange,
      disabledDate,
      onClick,
      onKeyDown,
      onMouseEnter,
      tabIndex,
   } = useDay({
      date,
      focusedDate,
      isDateFocused,
      isDateSelected,
      isDateHovered,
      isDateBlocked,
      isFirstOrLastSelectedDate,
      onDateFocus,
      onDateSelect,
      onDateHover,
      dayRef,
   })
   
   if (!dayLabel) {
      return <div />
   }
   
   const getColorFn = getColor(
      isSelected,
      isSelectedStartOrEnd,
      isWithinHoverRange,
      disabledDate,
   )
   
   return (
      <Button
         onClick={onClick}
         onKeyDown={onKeyDown}
         onMouseEnter={onMouseEnter}
         tabIndex={tabIndex}
         type="button"
         ref={dayRef}
         sx={{
            borderRadius: 'none',
            px: 2,
            _hover: {
               // borderRadius: 'md',
               bgColor: cmf('brand.100', 'gray.800'),
               color: cmf('gray.900', 'white'),
            },
         }}
         css={{
            // padding: "8px",
            border: 0,
            color: getColorFn({
               selectedFirstOrLastColor: "#eaeaea",
               normalColor: cmf("#001217", 'gray.200'),
               selectedColor: cmf("#0e4150", "#d7f5ff"),
               rangeHoverColor: cmf("#574016", "#ffefdb"),
               disabledColor: "#808285",
            }),
            background: getColorFn({
               selectedFirstOrLastColor: "#0E4150",
               normalColor: cmf("#FFFFFF", "transparent"),
               selectedColor: cmf("#8db3bf", "#42545f"),
               rangeHoverColor: cmf("#F0CEA0", "rgba(240,206,160,0.38)"),
               disabledColor: "#FFFFFF",
            }),
         }}
      >
         {dayLabel}
      </Button>
   )
}

function getColor(
   isSelected: boolean,
   isSelectedStartOrEnd: any,
   isWithinHoverRange: any,
   isDisabled: boolean,
) {
   return ({
              selectedFirstOrLastColor,
              normalColor,
              selectedColor,
              rangeHoverColor,
              disabledColor,
           }: any) => {
      if (isSelectedStartOrEnd) {
         return selectedFirstOrLastColor
      } else if (isSelected) {
         return selectedColor
      } else if (isWithinHoverRange) {
         return rangeHoverColor
      } else if (isDisabled) {
         return disabledColor
      } else {
         return normalColor
      }
   }
}
