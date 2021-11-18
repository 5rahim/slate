import { useMonth } from '@datepicker-react/hooks'
import { Day } from '@slate/components/DatePicker/Day'
import { useCMF } from '@slate/hooks/useColorModeFunction'
import { Box, Text } from 'chalkui/dist/cjs/React'
import { useTranslation } from 'react-i18next'

export function Month({ year, month, firstDayOfWeek }: any) {
   const { t } = useTranslation(['common'], { useSuspense: false })
   
   const cmf = useCMF()
   
   const { days, weekdayLabels, monthLabel } = useMonth({
      year,
      month,
      firstDayOfWeek,
   })
   
   return (
      <Box
         sx={{
            borderRadius: 'md',
            overflow: 'hidden',
            bgColor: cmf('gray.200', 'gray.600'),
            // border: '1px solid #ccc',
            boxShadow: 'xs',
         }}
      >
         <Box sx={{ textAlign: "center", py: 4, bgColor: cmf('gray.200', 'gray.700') }}>
            <Text fontWeight="bold">{t('date.' + monthLabel.split(' ')[0])} {monthLabel.split(' ')[1]}</Text>
         </Box>
         <Box
            sx={{
               display: "grid",
               gridTemplateColumns: "repeat(7, 1fr)",
               justifyContent: "center",
               pb: "10px",
               fontSize: "1rem",
               bgColor: cmf('gray.200', 'gray.700'),
            }}
         >
            {weekdayLabels.map(dayLabel => (
               <Box css={{ textAlign: "center" }} key={dayLabel}>
                  {t('date.' + dayLabel)}
               </Box>
            ))}
         </Box>
         <Box
            css={{
               display: "grid",
               gridTemplateColumns: "repeat(7, 1fr)",
               justifyContent: "center",
            }}
         >
            {days.map((day, index) => {
               if (typeof day === "object") {
                  return (
                     <Day
                        date={day.date}
                        key={day.date.toString()}
                        dayLabel={day.dayLabel}
                     />
                  )
               }
               
               return <div key={index} />
            })}
         </Box>
      </Box>
   )
}
