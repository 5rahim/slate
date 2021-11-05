import { SlateCourse } from 'slate/types/Course'
import { SlateSchool } from 'slate/types/Schools'
import { SlateUser } from 'slate/types/User'

export type DashboardPage = {
   user?: SlateUser,
   school?: SlateSchool
   course?: SlateCourse
   iid: string
}
