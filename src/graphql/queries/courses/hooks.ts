import { Course_Enrollment, Course_Management } from '@slate/generated/graphql'
import {
   UPDATE_COURSE_AVAILABILITY, UPDATE_COURSE_BACKGROUND_COLOR, UPDATE_COURSE_BANNER_COLOR, UPDATE_COURSE_CODE, UPDATE_COURSE_DETAILS,
   UPDATE_COURSE_DURATION,
} from '@slate/graphql/queries/courses/mutations'
import { SlateCourse } from '@slate/types/Course'
import { useMutationHookCreator, useQueryHookCreator } from '../../utils'
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
      debug: true,
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
      debug: true,
   })
}


export const useMutateCourseDetails = () => {
   
   return useMutationHookCreator(UPDATE_COURSE_DETAILS, {
      refetchQueries: [
         { query: GET_COURSE_BY_ID },
         'GetCourseById',
      ],
      successAlert: {
         type: "toast",
         title: "Course title and description updated",
      },
      debug: true,
   })
}

export const getCourseById = (id: string) => {
   
   return useQueryHookCreator<SlateCourse>('courses', GET_COURSE_BY_ID, "object", {
      variables: { id }, fetchPolicy: 'cache-first', nextFetchPolicy: "cache-and-network",
   })
   
}

export const getAllStudentEnrollments = () => {
   
   return useQueryHookCreator<Course_Enrollment[]>("course_enrollment", GET_ALL_COURSE_ENROLLMENTS, "array", { fetchPolicy: "no-cache" })
   
}


export const getAllCourseManagements = () => {
   
   return useQueryHookCreator<Course_Management[]>("course_management", GET_ALL_COURSE_MANAGEMENTS, "array", { fetchPolicy: "no-cache" })
   
}

export const getStudentEnrollments = (course_id: string) => {
   
   return useQueryHookCreator<Course_Enrollment[]>(
      "course_enrollment",
      GET_COURSE_ENROLLMENTS,
      "array",
      {
         variables: { course_id },
         fetchPolicy: "no-cache",
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
         fetchPolicy: "no-cache",
      },
   )
   
}


export const getOwnCourses = () => {
   
   return useQueryHookCreator<SlateCourse[]>("courses", GET_OWN_COURSES, "array", { fetchPolicy: "no-cache" })
   
}
