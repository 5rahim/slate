import { Course_Enrollment, Course_Management, Courses, UpdateCourseDetailsMutationVariables } from '@slate/generated/graphql'
import { SlateMutationHook, useMutationHookCreator } from '@slate/graphql/hooks/useMutationHookCreator'
import { useQueryHookCreator } from '@slate/graphql/hooks/useQueryHookCreator'
import {
   UPDATE_COURSE_AVAILABILITY, UPDATE_COURSE_BACKGROUND_COLOR, UPDATE_COURSE_BANNER_COLOR, UPDATE_COURSE_CODE, UPDATE_COURSE_DETAILS,
   UPDATE_COURSE_DURATION,
} from '@slate/graphql/schemas/courses/mutations'
import { useUserSessionProfile } from '@slate/hooks/useCurrentUser'
import { SlateCourse } from '@slate/types/Course'
import { useEffect, useState } from 'react'
import {
   GET_ALL_COURSE_ENROLLMENTS, GET_ALL_COURSE_MANAGEMENTS, GET_COURSE_BY_ID, GET_COURSE_ENROLLMENTS, GET_COURSE_MANAGEMENTS, GET_OWN_COURSES,
} from './queries'

export const useMutateCourseBannerColor = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_BANNER_COLOR, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Banner color updated",
      },
   })
}

export const useMutateCourseBackgroundColor = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_BACKGROUND_COLOR, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Background color updated",
      },
   })
}


export const useMutateCourseAvailability = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_AVAILABILITY, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Course accessiblity changed",
      },
   })
}

export const useMutateCourseCode = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_CODE, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Course code updated",
      },
   })
}

export const useMutateCourseDuration = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_DURATION, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Course duration updated",
      },
   })
}


export const useMutateCourseDetails: SlateMutationHook<UpdateCourseDetailsMutationVariables> = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_DETAILS, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Course title and description updated",
      },
   })
}

export const getCourseById = (id: string) => {
   
   return useQueryHookCreator<SlateCourse>('courses', GET_COURSE_BY_ID, "object", {
      variables: { id }, fetchPolicy: 'cache-first', nextFetchPolicy: "cache-and-network",
   })
   
}

export const getCourseList = () => {
   
   const { profile } = useUserSessionProfile()
   
   const [courses, setCourses] = useState<Courses[]>([])
   
   const useQuery = profile?.role === 'assistant' ? getAllCourseManagements : ( profile?.role === 'student'
      ? getAllStudentEnrollments
      : getOwnCourses )
   
   const [data, loading, empty]: any = useQuery()
   
   useEffect(() => {
      
      switch (profile?.role) {
         case 'assistant':
            if (data) {
               for (const management of data) {
                  if (management.course) {
                     courses.push(management.course)
                  }
               }
               setCourses(courses)
            }
            break
         case 'student':
            if (data) {
               for (const enrollment of data) {
                  if (enrollment.course) {
                     courses.push(enrollment.course)
                     // if (enrollment.course.available) {
                     // }
                  }
               }
               setCourses(courses)
            }
            // setHiddenCourses(hiddenCourses)
            break
         default:
            if (data) {
               setCourses(data as SlateCourse[])
            }
            break
         
      }
      
   }, [data])
   
   return [courses, loading, empty] as [Courses[], boolean, boolean]
   
}

export const getAllStudentEnrollments = () => {
   
   return useQueryHookCreator<Course_Enrollment[]>("course_enrollment", GET_ALL_COURSE_ENROLLMENTS, "array", { fetchPolicy: "cache-first" })
   
}


export const getAllCourseManagements = () => {
   
   return useQueryHookCreator<Course_Management[]>("course_management", GET_ALL_COURSE_MANAGEMENTS, "array", { fetchPolicy: "cache-first" })
   
   
}

export const getStudentEnrollments = (course_id: string) => {
   
   return useQueryHookCreator<Course_Enrollment[]>(
      "course_enrollment",
      GET_COURSE_ENROLLMENTS,
      "array",
      {
         variables: { course_id },
         fetchPolicy: "cache-first",
         nextFetchPolicy: 'cache-and-network'
      },
   )
   
}


export const getCourseManagements = (course_id: string) => {
   
   return useQueryHookCreator<Course_Management[]>(
      "course_management",
      GET_COURSE_MANAGEMENTS,
      "array",
      {
         variables: { course_id },
         fetchPolicy: "cache-first",
         nextFetchPolicy: 'cache-and-network'
      },
   )
   
}


export const getOwnCourses = () => {
   
   return useQueryHookCreator<SlateCourse[]>("courses", GET_OWN_COURSES, "array", { fetchPolicy: "cache-first", nextFetchPolicy: 'cache-and-network' })
   
}
