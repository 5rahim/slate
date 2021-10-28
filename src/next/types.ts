import SlateSchool from '../graphql/types/Schools'
import SlateUser from '../graphql/types/User'
import { SlateCourse } from '../graphql/types/Course'

export type NextPageWithSubdomain = {
   iid: string
   school: SlateSchool
}

export type DashboardPage = {
   user?: SlateUser,
   school?: SlateSchool
   course?: SlateCourse
   iid: string
}
