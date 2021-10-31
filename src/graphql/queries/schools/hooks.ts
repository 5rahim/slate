import { QueryResult, useQuery } from '@apollo/client'
import { GET_SCHOOL_BY_SHORT_NAME_QUERY } from './queries'
import { NextRouter } from 'next/router'
import { legacyHandleQueryError, legacyQueryReturn } from '../../utils'
import SlateSchool from '../../types/Schools'

