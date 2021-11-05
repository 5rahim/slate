import * as Apollo from '@apollo/client'
import { gql } from '@apollo/client'

export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
   ID: string;
   String: string;
   Boolean: boolean;
   Int: number;
   Float: number;
   date: any;
   numeric: any;
   timestamptz: any;
   uuid: any;
};

/** Boolean expression to compare columns of type "Boolean". All fields are combined with logical 'AND'. */
export type Boolean_Comparison_Exp = {
   _eq?: Maybe<Scalars['Boolean']>;
   _gt?: Maybe<Scalars['Boolean']>;
   _gte?: Maybe<Scalars['Boolean']>;
   _in?: Maybe<Array<Scalars['Boolean']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['Boolean']>;
   _lte?: Maybe<Scalars['Boolean']>;
   _neq?: Maybe<Scalars['Boolean']>;
   _nin?: Maybe<Array<Scalars['Boolean']>>;
};

/** Boolean expression to compare columns of type "Int". All fields are combined with logical 'AND'. */
export type Int_Comparison_Exp = {
   _eq?: Maybe<Scalars['Int']>;
   _gt?: Maybe<Scalars['Int']>;
   _gte?: Maybe<Scalars['Int']>;
   _in?: Maybe<Array<Scalars['Int']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['Int']>;
   _lte?: Maybe<Scalars['Int']>;
   _neq?: Maybe<Scalars['Int']>;
   _nin?: Maybe<Array<Scalars['Int']>>;
};

/** Boolean expression to compare columns of type "String". All fields are combined with logical 'AND'. */
export type String_Comparison_Exp = {
   _eq?: Maybe<Scalars['String']>;
   _gt?: Maybe<Scalars['String']>;
   _gte?: Maybe<Scalars['String']>;
   /** does the column match the given case-insensitive pattern */
   _ilike?: Maybe<Scalars['String']>;
   _in?: Maybe<Array<Scalars['String']>>;
   /** does the column match the given POSIX regular expression, case insensitive */
   _iregex?: Maybe<Scalars['String']>;
   _is_null?: Maybe<Scalars['Boolean']>;
   /** does the column match the given pattern */
   _like?: Maybe<Scalars['String']>;
   _lt?: Maybe<Scalars['String']>;
   _lte?: Maybe<Scalars['String']>;
   _neq?: Maybe<Scalars['String']>;
   /** does the column NOT match the given case-insensitive pattern */
   _nilike?: Maybe<Scalars['String']>;
   _nin?: Maybe<Array<Scalars['String']>>;
   /** does the column NOT match the given POSIX regular expression, case insensitive */
   _niregex?: Maybe<Scalars['String']>;
   /** does the column NOT match the given pattern */
   _nlike?: Maybe<Scalars['String']>;
   /** does the column NOT match the given POSIX regular expression, case sensitive */
   _nregex?: Maybe<Scalars['String']>;
   /** does the column NOT match the given SQL regular expression */
   _nsimilar?: Maybe<Scalars['String']>;
   /** does the column match the given POSIX regular expression, case sensitive */
   _regex?: Maybe<Scalars['String']>;
   /** does the column match the given SQL regular expression */
   _similar?: Maybe<Scalars['String']>;
};

/** columns and relationships of "accounts" */
export type Accounts = {
   __typename?: 'accounts';
   access_token?: Maybe<Scalars['String']>;
   expires_at?: Maybe<Scalars['Int']>;
   expires_in?: Maybe<Scalars['timestamptz']>;
   id: Scalars['Int'];
   id_token?: Maybe<Scalars['String']>;
   oauth_token?: Maybe<Scalars['String']>;
   oauth_token_secret?: Maybe<Scalars['String']>;
   provider: Scalars['String'];
   providerAccountId: Scalars['String'];
   refresh_token?: Maybe<Scalars['String']>;
   scope?: Maybe<Scalars['String']>;
   session_state?: Maybe<Scalars['String']>;
   token_type?: Maybe<Scalars['String']>;
   type: Scalars['String'];
   userId: Scalars['Int'];
};

/** aggregated selection of "accounts" */
export type Accounts_Aggregate = {
   __typename?: 'accounts_aggregate';
   aggregate?: Maybe<Accounts_Aggregate_Fields>;
   nodes: Array<Accounts>;
};

/** aggregate fields of "accounts" */
export type Accounts_Aggregate_Fields = {
   __typename?: 'accounts_aggregate_fields';
   avg?: Maybe<Accounts_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Accounts_Max_Fields>;
   min?: Maybe<Accounts_Min_Fields>;
   stddev?: Maybe<Accounts_Stddev_Fields>;
   stddev_pop?: Maybe<Accounts_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Accounts_Stddev_Samp_Fields>;
   sum?: Maybe<Accounts_Sum_Fields>;
   var_pop?: Maybe<Accounts_Var_Pop_Fields>;
   var_samp?: Maybe<Accounts_Var_Samp_Fields>;
   variance?: Maybe<Accounts_Variance_Fields>;
};


/** aggregate fields of "accounts" */
export type Accounts_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Accounts_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Accounts_Avg_Fields = {
   __typename?: 'accounts_avg_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "accounts". All fields are combined with a logical 'AND'. */
export type Accounts_Bool_Exp = {
   _and?: Maybe<Array<Accounts_Bool_Exp>>;
   _not?: Maybe<Accounts_Bool_Exp>;
   _or?: Maybe<Array<Accounts_Bool_Exp>>;
   access_token?: Maybe<String_Comparison_Exp>;
   expires_at?: Maybe<Int_Comparison_Exp>;
   expires_in?: Maybe<Timestamptz_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   id_token?: Maybe<String_Comparison_Exp>;
   oauth_token?: Maybe<String_Comparison_Exp>;
   oauth_token_secret?: Maybe<String_Comparison_Exp>;
   provider?: Maybe<String_Comparison_Exp>;
   providerAccountId?: Maybe<String_Comparison_Exp>;
   refresh_token?: Maybe<String_Comparison_Exp>;
   scope?: Maybe<String_Comparison_Exp>;
   session_state?: Maybe<String_Comparison_Exp>;
   token_type?: Maybe<String_Comparison_Exp>;
   type?: Maybe<String_Comparison_Exp>;
   userId?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "accounts" */
export enum Accounts_Constraint {
   /** unique or primary key constraint */
   AccountsPkey = 'accounts_pkey'
}

/** input type for incrementing numeric columns in table "accounts" */
export type Accounts_Inc_Input = {
   expires_at?: Maybe<Scalars['Int']>;
   id?: Maybe<Scalars['Int']>;
   userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "accounts" */
export type Accounts_Insert_Input = {
   access_token?: Maybe<Scalars['String']>;
   expires_at?: Maybe<Scalars['Int']>;
   expires_in?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   id_token?: Maybe<Scalars['String']>;
   oauth_token?: Maybe<Scalars['String']>;
   oauth_token_secret?: Maybe<Scalars['String']>;
   provider?: Maybe<Scalars['String']>;
   providerAccountId?: Maybe<Scalars['String']>;
   refresh_token?: Maybe<Scalars['String']>;
   scope?: Maybe<Scalars['String']>;
   session_state?: Maybe<Scalars['String']>;
   token_type?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Accounts_Max_Fields = {
   __typename?: 'accounts_max_fields';
   access_token?: Maybe<Scalars['String']>;
   expires_at?: Maybe<Scalars['Int']>;
   expires_in?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   id_token?: Maybe<Scalars['String']>;
   oauth_token?: Maybe<Scalars['String']>;
   oauth_token_secret?: Maybe<Scalars['String']>;
   provider?: Maybe<Scalars['String']>;
   providerAccountId?: Maybe<Scalars['String']>;
   refresh_token?: Maybe<Scalars['String']>;
   scope?: Maybe<Scalars['String']>;
   session_state?: Maybe<Scalars['String']>;
   token_type?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Accounts_Min_Fields = {
   __typename?: 'accounts_min_fields';
   access_token?: Maybe<Scalars['String']>;
   expires_at?: Maybe<Scalars['Int']>;
   expires_in?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   id_token?: Maybe<Scalars['String']>;
   oauth_token?: Maybe<Scalars['String']>;
   oauth_token_secret?: Maybe<Scalars['String']>;
   provider?: Maybe<Scalars['String']>;
   providerAccountId?: Maybe<Scalars['String']>;
   refresh_token?: Maybe<Scalars['String']>;
   scope?: Maybe<Scalars['String']>;
   session_state?: Maybe<Scalars['String']>;
   token_type?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "accounts" */
export type Accounts_Mutation_Response = {
   __typename?: 'accounts_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Accounts>;
};

/** on conflict condition type for table "accounts" */
export type Accounts_On_Conflict = {
   constraint: Accounts_Constraint;
   update_columns?: Array<Accounts_Update_Column>;
   where?: Maybe<Accounts_Bool_Exp>;
};

/** Ordering options when selecting data from "accounts". */
export type Accounts_Order_By = {
   access_token?: Maybe<Order_By>;
   expires_at?: Maybe<Order_By>;
   expires_in?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   id_token?: Maybe<Order_By>;
   oauth_token?: Maybe<Order_By>;
   oauth_token_secret?: Maybe<Order_By>;
   provider?: Maybe<Order_By>;
   providerAccountId?: Maybe<Order_By>;
   refresh_token?: Maybe<Order_By>;
   scope?: Maybe<Order_By>;
   session_state?: Maybe<Order_By>;
   token_type?: Maybe<Order_By>;
   type?: Maybe<Order_By>;
   userId?: Maybe<Order_By>;
};

/** primary key columns input for table: accounts */
export type Accounts_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "accounts" */
export enum Accounts_Select_Column {
   /** column name */
   AccessToken = 'access_token',
   /** column name */
   ExpiresAt = 'expires_at',
   /** column name */
   ExpiresIn = 'expires_in',
   /** column name */
   Id = 'id',
   /** column name */
   IdToken = 'id_token',
   /** column name */
   OauthToken = 'oauth_token',
   /** column name */
   OauthTokenSecret = 'oauth_token_secret',
   /** column name */
   Provider = 'provider',
   /** column name */
   ProviderAccountId = 'providerAccountId',
   /** column name */
   RefreshToken = 'refresh_token',
   /** column name */
   Scope = 'scope',
   /** column name */
   SessionState = 'session_state',
   /** column name */
   TokenType = 'token_type',
   /** column name */
   Type = 'type',
   /** column name */
   UserId = 'userId'
}

/** input type for updating data in table "accounts" */
export type Accounts_Set_Input = {
   access_token?: Maybe<Scalars['String']>;
   expires_at?: Maybe<Scalars['Int']>;
   expires_in?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   id_token?: Maybe<Scalars['String']>;
   oauth_token?: Maybe<Scalars['String']>;
   oauth_token_secret?: Maybe<Scalars['String']>;
   provider?: Maybe<Scalars['String']>;
   providerAccountId?: Maybe<Scalars['String']>;
   refresh_token?: Maybe<Scalars['String']>;
   scope?: Maybe<Scalars['String']>;
   session_state?: Maybe<Scalars['String']>;
   token_type?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Accounts_Stddev_Fields = {
   __typename?: 'accounts_stddev_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Accounts_Stddev_Pop_Fields = {
   __typename?: 'accounts_stddev_pop_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Accounts_Stddev_Samp_Fields = {
   __typename?: 'accounts_stddev_samp_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Accounts_Sum_Fields = {
   __typename?: 'accounts_sum_fields';
   expires_at?: Maybe<Scalars['Int']>;
   id?: Maybe<Scalars['Int']>;
   userId?: Maybe<Scalars['Int']>;
};

/** update columns of table "accounts" */
export enum Accounts_Update_Column {
   /** column name */
   AccessToken = 'access_token',
   /** column name */
   ExpiresAt = 'expires_at',
   /** column name */
   ExpiresIn = 'expires_in',
   /** column name */
   Id = 'id',
   /** column name */
   IdToken = 'id_token',
   /** column name */
   OauthToken = 'oauth_token',
   /** column name */
   OauthTokenSecret = 'oauth_token_secret',
   /** column name */
   Provider = 'provider',
   /** column name */
   ProviderAccountId = 'providerAccountId',
   /** column name */
   RefreshToken = 'refresh_token',
   /** column name */
   Scope = 'scope',
   /** column name */
   SessionState = 'session_state',
   /** column name */
   TokenType = 'token_type',
   /** column name */
   Type = 'type',
   /** column name */
   UserId = 'userId'
}

/** aggregate var_pop on columns */
export type Accounts_Var_Pop_Fields = {
   __typename?: 'accounts_var_pop_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Accounts_Var_Samp_Fields = {
   __typename?: 'accounts_var_samp_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Accounts_Variance_Fields = {
   __typename?: 'accounts_variance_fields';
   expires_at?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "contacts" */
export type Contacts = {
   __typename?: 'contacts';
   comments?: Maybe<Scalars['String']>;
   country: Scalars['String'];
   email: Scalars['String'];
   full_name: Scalars['String'];
   id: Scalars['Int'];
   institution_name: Scalars['String'];
   institution_type: Scalars['Int'];
   job_title: Scalars['String'];
   phone: Scalars['String'];
   purchase_date: Scalars['Int'];
   reason: Scalars['Int'];
};

/** aggregated selection of "contacts" */
export type Contacts_Aggregate = {
   __typename?: 'contacts_aggregate';
   aggregate?: Maybe<Contacts_Aggregate_Fields>;
   nodes: Array<Contacts>;
};

/** aggregate fields of "contacts" */
export type Contacts_Aggregate_Fields = {
   __typename?: 'contacts_aggregate_fields';
   avg?: Maybe<Contacts_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Contacts_Max_Fields>;
   min?: Maybe<Contacts_Min_Fields>;
   stddev?: Maybe<Contacts_Stddev_Fields>;
   stddev_pop?: Maybe<Contacts_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Contacts_Stddev_Samp_Fields>;
   sum?: Maybe<Contacts_Sum_Fields>;
   var_pop?: Maybe<Contacts_Var_Pop_Fields>;
   var_samp?: Maybe<Contacts_Var_Samp_Fields>;
   variance?: Maybe<Contacts_Variance_Fields>;
};


/** aggregate fields of "contacts" */
export type Contacts_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Contacts_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Contacts_Avg_Fields = {
   __typename?: 'contacts_avg_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "contacts". All fields are combined with a logical 'AND'. */
export type Contacts_Bool_Exp = {
   _and?: Maybe<Array<Contacts_Bool_Exp>>;
   _not?: Maybe<Contacts_Bool_Exp>;
   _or?: Maybe<Array<Contacts_Bool_Exp>>;
   comments?: Maybe<String_Comparison_Exp>;
   country?: Maybe<String_Comparison_Exp>;
   email?: Maybe<String_Comparison_Exp>;
   full_name?: Maybe<String_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   institution_name?: Maybe<String_Comparison_Exp>;
   institution_type?: Maybe<Int_Comparison_Exp>;
   job_title?: Maybe<String_Comparison_Exp>;
   phone?: Maybe<String_Comparison_Exp>;
   purchase_date?: Maybe<Int_Comparison_Exp>;
   reason?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "contacts" */
export enum Contacts_Constraint {
   /** unique or primary key constraint */
   ContactsPkey = 'contacts_pkey'
}

/** input type for incrementing numeric columns in table "contacts" */
export type Contacts_Inc_Input = {
   id?: Maybe<Scalars['Int']>;
   institution_type?: Maybe<Scalars['Int']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "contacts" */
export type Contacts_Insert_Input = {
   comments?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   full_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   institution_name?: Maybe<Scalars['String']>;
   institution_type?: Maybe<Scalars['Int']>;
   job_title?: Maybe<Scalars['String']>;
   phone?: Maybe<Scalars['String']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Contacts_Max_Fields = {
   __typename?: 'contacts_max_fields';
   comments?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   full_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   institution_name?: Maybe<Scalars['String']>;
   institution_type?: Maybe<Scalars['Int']>;
   job_title?: Maybe<Scalars['String']>;
   phone?: Maybe<Scalars['String']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Contacts_Min_Fields = {
   __typename?: 'contacts_min_fields';
   comments?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   full_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   institution_name?: Maybe<Scalars['String']>;
   institution_type?: Maybe<Scalars['Int']>;
   job_title?: Maybe<Scalars['String']>;
   phone?: Maybe<Scalars['String']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "contacts" */
export type Contacts_Mutation_Response = {
   __typename?: 'contacts_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Contacts>;
};

/** on conflict condition type for table "contacts" */
export type Contacts_On_Conflict = {
   constraint: Contacts_Constraint;
   update_columns?: Array<Contacts_Update_Column>;
   where?: Maybe<Contacts_Bool_Exp>;
};

/** Ordering options when selecting data from "contacts". */
export type Contacts_Order_By = {
   comments?: Maybe<Order_By>;
   country?: Maybe<Order_By>;
   email?: Maybe<Order_By>;
   full_name?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   institution_name?: Maybe<Order_By>;
   institution_type?: Maybe<Order_By>;
   job_title?: Maybe<Order_By>;
   phone?: Maybe<Order_By>;
   purchase_date?: Maybe<Order_By>;
   reason?: Maybe<Order_By>;
};

/** primary key columns input for table: contacts */
export type Contacts_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "contacts" */
export enum Contacts_Select_Column {
   /** column name */
   Comments = 'comments',
   /** column name */
   Country = 'country',
   /** column name */
   Email = 'email',
   /** column name */
   FullName = 'full_name',
   /** column name */
   Id = 'id',
   /** column name */
   InstitutionName = 'institution_name',
   /** column name */
   InstitutionType = 'institution_type',
   /** column name */
   JobTitle = 'job_title',
   /** column name */
   Phone = 'phone',
   /** column name */
   PurchaseDate = 'purchase_date',
   /** column name */
   Reason = 'reason'
}

/** input type for updating data in table "contacts" */
export type Contacts_Set_Input = {
   comments?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   full_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   institution_name?: Maybe<Scalars['String']>;
   institution_type?: Maybe<Scalars['Int']>;
   job_title?: Maybe<Scalars['String']>;
   phone?: Maybe<Scalars['String']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Contacts_Stddev_Fields = {
   __typename?: 'contacts_stddev_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Contacts_Stddev_Pop_Fields = {
   __typename?: 'contacts_stddev_pop_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Contacts_Stddev_Samp_Fields = {
   __typename?: 'contacts_stddev_samp_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Contacts_Sum_Fields = {
   __typename?: 'contacts_sum_fields';
   id?: Maybe<Scalars['Int']>;
   institution_type?: Maybe<Scalars['Int']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
};

/** update columns of table "contacts" */
export enum Contacts_Update_Column {
   /** column name */
   Comments = 'comments',
   /** column name */
   Country = 'country',
   /** column name */
   Email = 'email',
   /** column name */
   FullName = 'full_name',
   /** column name */
   Id = 'id',
   /** column name */
   InstitutionName = 'institution_name',
   /** column name */
   InstitutionType = 'institution_type',
   /** column name */
   JobTitle = 'job_title',
   /** column name */
   Phone = 'phone',
   /** column name */
   PurchaseDate = 'purchase_date',
   /** column name */
   Reason = 'reason'
}

/** aggregate var_pop on columns */
export type Contacts_Var_Pop_Fields = {
   __typename?: 'contacts_var_pop_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Contacts_Var_Samp_Fields = {
   __typename?: 'contacts_var_samp_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Contacts_Variance_Fields = {
   __typename?: 'contacts_variance_fields';
   id?: Maybe<Scalars['Float']>;
   institution_type?: Maybe<Scalars['Float']>;
   purchase_date?: Maybe<Scalars['Float']>;
   reason?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "course_enrollment" */
export type Course_Enrollment = {
   __typename?: 'course_enrollment';
   authorized: Scalars['Boolean'];
   authorized_at?: Maybe<Scalars['timestamptz']>;
   /** An object relationship */
   course?: Maybe<Courses>;
   course_id: Scalars['uuid'];
   created_at: Scalars['timestamptz'];
   id: Scalars['uuid'];
   /** An object relationship */
   student?: Maybe<Users>;
   student_id: Scalars['Int'];
};

/** aggregated selection of "course_enrollment" */
export type Course_Enrollment_Aggregate = {
   __typename?: 'course_enrollment_aggregate';
   aggregate?: Maybe<Course_Enrollment_Aggregate_Fields>;
   nodes: Array<Course_Enrollment>;
};

/** aggregate fields of "course_enrollment" */
export type Course_Enrollment_Aggregate_Fields = {
   __typename?: 'course_enrollment_aggregate_fields';
   avg?: Maybe<Course_Enrollment_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Course_Enrollment_Max_Fields>;
   min?: Maybe<Course_Enrollment_Min_Fields>;
   stddev?: Maybe<Course_Enrollment_Stddev_Fields>;
   stddev_pop?: Maybe<Course_Enrollment_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Course_Enrollment_Stddev_Samp_Fields>;
   sum?: Maybe<Course_Enrollment_Sum_Fields>;
   var_pop?: Maybe<Course_Enrollment_Var_Pop_Fields>;
   var_samp?: Maybe<Course_Enrollment_Var_Samp_Fields>;
   variance?: Maybe<Course_Enrollment_Variance_Fields>;
};


/** aggregate fields of "course_enrollment" */
export type Course_Enrollment_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Course_Enrollment_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_enrollment" */
export type Course_Enrollment_Aggregate_Order_By = {
   avg?: Maybe<Course_Enrollment_Avg_Order_By>;
   count?: Maybe<Order_By>;
   max?: Maybe<Course_Enrollment_Max_Order_By>;
   min?: Maybe<Course_Enrollment_Min_Order_By>;
   stddev?: Maybe<Course_Enrollment_Stddev_Order_By>;
   stddev_pop?: Maybe<Course_Enrollment_Stddev_Pop_Order_By>;
   stddev_samp?: Maybe<Course_Enrollment_Stddev_Samp_Order_By>;
   sum?: Maybe<Course_Enrollment_Sum_Order_By>;
   var_pop?: Maybe<Course_Enrollment_Var_Pop_Order_By>;
   var_samp?: Maybe<Course_Enrollment_Var_Samp_Order_By>;
   variance?: Maybe<Course_Enrollment_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_enrollment" */
export type Course_Enrollment_Arr_Rel_Insert_Input = {
   data: Array<Course_Enrollment_Insert_Input>;
   /** on conflict condition */
   on_conflict?: Maybe<Course_Enrollment_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Enrollment_Avg_Fields = {
   __typename?: 'course_enrollment_avg_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_enrollment" */
export type Course_Enrollment_Avg_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_enrollment". All fields are combined with a logical 'AND'. */
export type Course_Enrollment_Bool_Exp = {
   _and?: Maybe<Array<Course_Enrollment_Bool_Exp>>;
   _not?: Maybe<Course_Enrollment_Bool_Exp>;
   _or?: Maybe<Array<Course_Enrollment_Bool_Exp>>;
   authorized?: Maybe<Boolean_Comparison_Exp>;
   authorized_at?: Maybe<Timestamptz_Comparison_Exp>;
   course?: Maybe<Courses_Bool_Exp>;
   course_id?: Maybe<Uuid_Comparison_Exp>;
   created_at?: Maybe<Timestamptz_Comparison_Exp>;
   id?: Maybe<Uuid_Comparison_Exp>;
   student?: Maybe<Users_Bool_Exp>;
   student_id?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_enrollment" */
export enum Course_Enrollment_Constraint {
   /** unique or primary key constraint */
   CourseEnrollmentPkey = 'course_enrollment_pkey'
}

/** input type for incrementing numeric columns in table "course_enrollment" */
export type Course_Enrollment_Inc_Input = {
   student_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "course_enrollment" */
export type Course_Enrollment_Insert_Input = {
   authorized?: Maybe<Scalars['Boolean']>;
   authorized_at?: Maybe<Scalars['timestamptz']>;
   course?: Maybe<Courses_Obj_Rel_Insert_Input>;
   course_id?: Maybe<Scalars['uuid']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['uuid']>;
   student?: Maybe<Users_Obj_Rel_Insert_Input>;
   student_id?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Course_Enrollment_Max_Fields = {
   __typename?: 'course_enrollment_max_fields';
   authorized_at?: Maybe<Scalars['timestamptz']>;
   course_id?: Maybe<Scalars['uuid']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['uuid']>;
   student_id?: Maybe<Scalars['Int']>;
};

/** order by max() on columns of table "course_enrollment" */
export type Course_Enrollment_Max_Order_By = {
   authorized_at?: Maybe<Order_By>;
   course_id?: Maybe<Order_By>;
   created_at?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   student_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Enrollment_Min_Fields = {
   __typename?: 'course_enrollment_min_fields';
   authorized_at?: Maybe<Scalars['timestamptz']>;
   course_id?: Maybe<Scalars['uuid']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['uuid']>;
   student_id?: Maybe<Scalars['Int']>;
};

/** order by min() on columns of table "course_enrollment" */
export type Course_Enrollment_Min_Order_By = {
   authorized_at?: Maybe<Order_By>;
   course_id?: Maybe<Order_By>;
   created_at?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   student_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_enrollment" */
export type Course_Enrollment_Mutation_Response = {
   __typename?: 'course_enrollment_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Course_Enrollment>;
};

/** on conflict condition type for table "course_enrollment" */
export type Course_Enrollment_On_Conflict = {
   constraint: Course_Enrollment_Constraint;
   update_columns?: Array<Course_Enrollment_Update_Column>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};

/** Ordering options when selecting data from "course_enrollment". */
export type Course_Enrollment_Order_By = {
   authorized?: Maybe<Order_By>;
   authorized_at?: Maybe<Order_By>;
   course?: Maybe<Courses_Order_By>;
   course_id?: Maybe<Order_By>;
   created_at?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   student?: Maybe<Users_Order_By>;
   student_id?: Maybe<Order_By>;
};

/** primary key columns input for table: course_enrollment */
export type Course_Enrollment_Pk_Columns_Input = {
   id: Scalars['uuid'];
};

/** select columns of table "course_enrollment" */
export enum Course_Enrollment_Select_Column {
   /** column name */
   Authorized = 'authorized',
   /** column name */
   AuthorizedAt = 'authorized_at',
   /** column name */
   CourseId = 'course_id',
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Id = 'id',
   /** column name */
   StudentId = 'student_id'
}

/** input type for updating data in table "course_enrollment" */
export type Course_Enrollment_Set_Input = {
   authorized?: Maybe<Scalars['Boolean']>;
   authorized_at?: Maybe<Scalars['timestamptz']>;
   course_id?: Maybe<Scalars['uuid']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['uuid']>;
   student_id?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Course_Enrollment_Stddev_Fields = {
   __typename?: 'course_enrollment_stddev_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_enrollment" */
export type Course_Enrollment_Stddev_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Enrollment_Stddev_Pop_Fields = {
   __typename?: 'course_enrollment_stddev_pop_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_enrollment" */
export type Course_Enrollment_Stddev_Pop_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Enrollment_Stddev_Samp_Fields = {
   __typename?: 'course_enrollment_stddev_samp_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_enrollment" */
export type Course_Enrollment_Stddev_Samp_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Enrollment_Sum_Fields = {
   __typename?: 'course_enrollment_sum_fields';
   student_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "course_enrollment" */
export type Course_Enrollment_Sum_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** update columns of table "course_enrollment" */
export enum Course_Enrollment_Update_Column {
   /** column name */
   Authorized = 'authorized',
   /** column name */
   AuthorizedAt = 'authorized_at',
   /** column name */
   CourseId = 'course_id',
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Id = 'id',
   /** column name */
   StudentId = 'student_id'
}

/** aggregate var_pop on columns */
export type Course_Enrollment_Var_Pop_Fields = {
   __typename?: 'course_enrollment_var_pop_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_enrollment" */
export type Course_Enrollment_Var_Pop_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Enrollment_Var_Samp_Fields = {
   __typename?: 'course_enrollment_var_samp_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_enrollment" */
export type Course_Enrollment_Var_Samp_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Enrollment_Variance_Fields = {
   __typename?: 'course_enrollment_variance_fields';
   student_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_enrollment" */
export type Course_Enrollment_Variance_Order_By = {
   student_id?: Maybe<Order_By>;
};

/** columns and relationships of "course_management" */
export type Course_Management = {
   __typename?: 'course_management';
   /** An object relationship */
   course?: Maybe<Courses>;
   course_id: Scalars['uuid'];
   id: Scalars['uuid'];
   /** An object relationship */
   manager?: Maybe<Users>;
   manager_id: Scalars['numeric'];
};

/** aggregated selection of "course_management" */
export type Course_Management_Aggregate = {
   __typename?: 'course_management_aggregate';
   aggregate?: Maybe<Course_Management_Aggregate_Fields>;
   nodes: Array<Course_Management>;
};

/** aggregate fields of "course_management" */
export type Course_Management_Aggregate_Fields = {
   __typename?: 'course_management_aggregate_fields';
   avg?: Maybe<Course_Management_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Course_Management_Max_Fields>;
   min?: Maybe<Course_Management_Min_Fields>;
   stddev?: Maybe<Course_Management_Stddev_Fields>;
   stddev_pop?: Maybe<Course_Management_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Course_Management_Stddev_Samp_Fields>;
   sum?: Maybe<Course_Management_Sum_Fields>;
   var_pop?: Maybe<Course_Management_Var_Pop_Fields>;
   var_samp?: Maybe<Course_Management_Var_Samp_Fields>;
   variance?: Maybe<Course_Management_Variance_Fields>;
};


/** aggregate fields of "course_management" */
export type Course_Management_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Course_Management_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "course_management" */
export type Course_Management_Aggregate_Order_By = {
   avg?: Maybe<Course_Management_Avg_Order_By>;
   count?: Maybe<Order_By>;
   max?: Maybe<Course_Management_Max_Order_By>;
   min?: Maybe<Course_Management_Min_Order_By>;
   stddev?: Maybe<Course_Management_Stddev_Order_By>;
   stddev_pop?: Maybe<Course_Management_Stddev_Pop_Order_By>;
   stddev_samp?: Maybe<Course_Management_Stddev_Samp_Order_By>;
   sum?: Maybe<Course_Management_Sum_Order_By>;
   var_pop?: Maybe<Course_Management_Var_Pop_Order_By>;
   var_samp?: Maybe<Course_Management_Var_Samp_Order_By>;
   variance?: Maybe<Course_Management_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "course_management" */
export type Course_Management_Arr_Rel_Insert_Input = {
   data: Array<Course_Management_Insert_Input>;
   /** on conflict condition */
   on_conflict?: Maybe<Course_Management_On_Conflict>;
};

/** aggregate avg on columns */
export type Course_Management_Avg_Fields = {
   __typename?: 'course_management_avg_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "course_management" */
export type Course_Management_Avg_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "course_management". All fields are combined with a logical 'AND'. */
export type Course_Management_Bool_Exp = {
   _and?: Maybe<Array<Course_Management_Bool_Exp>>;
   _not?: Maybe<Course_Management_Bool_Exp>;
   _or?: Maybe<Array<Course_Management_Bool_Exp>>;
   course?: Maybe<Courses_Bool_Exp>;
   course_id?: Maybe<Uuid_Comparison_Exp>;
   id?: Maybe<Uuid_Comparison_Exp>;
   manager?: Maybe<Users_Bool_Exp>;
   manager_id?: Maybe<Numeric_Comparison_Exp>;
};

/** unique or primary key constraints on table "course_management" */
export enum Course_Management_Constraint {
   /** unique or primary key constraint */
   CourseManagersPkey = 'course_managers_pkey'
}

/** input type for incrementing numeric columns in table "course_management" */
export type Course_Management_Inc_Input = {
   manager_id?: Maybe<Scalars['numeric']>;
};

/** input type for inserting data into table "course_management" */
export type Course_Management_Insert_Input = {
   course?: Maybe<Courses_Obj_Rel_Insert_Input>;
   course_id?: Maybe<Scalars['uuid']>;
   id?: Maybe<Scalars['uuid']>;
   manager?: Maybe<Users_Obj_Rel_Insert_Input>;
   manager_id?: Maybe<Scalars['numeric']>;
};

/** aggregate max on columns */
export type Course_Management_Max_Fields = {
   __typename?: 'course_management_max_fields';
   course_id?: Maybe<Scalars['uuid']>;
   id?: Maybe<Scalars['uuid']>;
   manager_id?: Maybe<Scalars['numeric']>;
};

/** order by max() on columns of table "course_management" */
export type Course_Management_Max_Order_By = {
   course_id?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   manager_id?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Course_Management_Min_Fields = {
   __typename?: 'course_management_min_fields';
   course_id?: Maybe<Scalars['uuid']>;
   id?: Maybe<Scalars['uuid']>;
   manager_id?: Maybe<Scalars['numeric']>;
};

/** order by min() on columns of table "course_management" */
export type Course_Management_Min_Order_By = {
   course_id?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   manager_id?: Maybe<Order_By>;
};

/** response of any mutation on the table "course_management" */
export type Course_Management_Mutation_Response = {
   __typename?: 'course_management_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Course_Management>;
};

/** on conflict condition type for table "course_management" */
export type Course_Management_On_Conflict = {
   constraint: Course_Management_Constraint;
   update_columns?: Array<Course_Management_Update_Column>;
   where?: Maybe<Course_Management_Bool_Exp>;
};

/** Ordering options when selecting data from "course_management". */
export type Course_Management_Order_By = {
   course?: Maybe<Courses_Order_By>;
   course_id?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   manager?: Maybe<Users_Order_By>;
   manager_id?: Maybe<Order_By>;
};

/** primary key columns input for table: course_management */
export type Course_Management_Pk_Columns_Input = {
   id: Scalars['uuid'];
};

/** select columns of table "course_management" */
export enum Course_Management_Select_Column {
   /** column name */
   CourseId = 'course_id',
   /** column name */
   Id = 'id',
   /** column name */
   ManagerId = 'manager_id'
}

/** input type for updating data in table "course_management" */
export type Course_Management_Set_Input = {
   course_id?: Maybe<Scalars['uuid']>;
   id?: Maybe<Scalars['uuid']>;
   manager_id?: Maybe<Scalars['numeric']>;
};

/** aggregate stddev on columns */
export type Course_Management_Stddev_Fields = {
   __typename?: 'course_management_stddev_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "course_management" */
export type Course_Management_Stddev_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Course_Management_Stddev_Pop_Fields = {
   __typename?: 'course_management_stddev_pop_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "course_management" */
export type Course_Management_Stddev_Pop_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Course_Management_Stddev_Samp_Fields = {
   __typename?: 'course_management_stddev_samp_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "course_management" */
export type Course_Management_Stddev_Samp_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Course_Management_Sum_Fields = {
   __typename?: 'course_management_sum_fields';
   manager_id?: Maybe<Scalars['numeric']>;
};

/** order by sum() on columns of table "course_management" */
export type Course_Management_Sum_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** update columns of table "course_management" */
export enum Course_Management_Update_Column {
   /** column name */
   CourseId = 'course_id',
   /** column name */
   Id = 'id',
   /** column name */
   ManagerId = 'manager_id'
}

/** aggregate var_pop on columns */
export type Course_Management_Var_Pop_Fields = {
   __typename?: 'course_management_var_pop_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "course_management" */
export type Course_Management_Var_Pop_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Course_Management_Var_Samp_Fields = {
   __typename?: 'course_management_var_samp_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "course_management" */
export type Course_Management_Var_Samp_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Course_Management_Variance_Fields = {
   __typename?: 'course_management_variance_fields';
   manager_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "course_management" */
export type Course_Management_Variance_Order_By = {
   manager_id?: Maybe<Order_By>;
};

/** columns and relationships of "courses" */
export type Courses = {
   __typename?: 'courses';
   access_code?: Maybe<Scalars['String']>;
   available: Scalars['Boolean'];
   background_color?: Maybe<Scalars['String']>;
   banner_color?: Maybe<Scalars['String']>;
   banner_image?: Maybe<Scalars['String']>;
   description?: Maybe<Scalars['String']>;
   duration?: Maybe<Scalars['String']>;
   /** An array relationship */
   enrollments: Array<Course_Enrollment>;
   /** An aggregate relationship */
   enrollments_aggregate: Course_Enrollment_Aggregate;
   id: Scalars['uuid'];
   /** An object relationship */
   instructor?: Maybe<Users>;
   instructor_id: Scalars['Int'];
   level?: Maybe<Scalars['String']>;
   /** An array relationship */
   management: Array<Course_Management>;
   /** An aggregate relationship */
   management_aggregate: Course_Management_Aggregate;
   name: Scalars['String'];
   schedule?: Maybe<Scalars['String']>;
};


/** columns and relationships of "courses" */
export type CoursesEnrollmentsArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


/** columns and relationships of "courses" */
export type CoursesEnrollments_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


/** columns and relationships of "courses" */
export type CoursesManagementArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


/** columns and relationships of "courses" */
export type CoursesManagement_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};

/** aggregated selection of "courses" */
export type Courses_Aggregate = {
   __typename?: 'courses_aggregate';
   aggregate?: Maybe<Courses_Aggregate_Fields>;
   nodes: Array<Courses>;
};

/** aggregate fields of "courses" */
export type Courses_Aggregate_Fields = {
   __typename?: 'courses_aggregate_fields';
   avg?: Maybe<Courses_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Courses_Max_Fields>;
   min?: Maybe<Courses_Min_Fields>;
   stddev?: Maybe<Courses_Stddev_Fields>;
   stddev_pop?: Maybe<Courses_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Courses_Stddev_Samp_Fields>;
   sum?: Maybe<Courses_Sum_Fields>;
   var_pop?: Maybe<Courses_Var_Pop_Fields>;
   var_samp?: Maybe<Courses_Var_Samp_Fields>;
   variance?: Maybe<Courses_Variance_Fields>;
};


/** aggregate fields of "courses" */
export type Courses_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Courses_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** order by aggregate values of table "courses" */
export type Courses_Aggregate_Order_By = {
   avg?: Maybe<Courses_Avg_Order_By>;
   count?: Maybe<Order_By>;
   max?: Maybe<Courses_Max_Order_By>;
   min?: Maybe<Courses_Min_Order_By>;
   stddev?: Maybe<Courses_Stddev_Order_By>;
   stddev_pop?: Maybe<Courses_Stddev_Pop_Order_By>;
   stddev_samp?: Maybe<Courses_Stddev_Samp_Order_By>;
   sum?: Maybe<Courses_Sum_Order_By>;
   var_pop?: Maybe<Courses_Var_Pop_Order_By>;
   var_samp?: Maybe<Courses_Var_Samp_Order_By>;
   variance?: Maybe<Courses_Variance_Order_By>;
};

/** input type for inserting array relation for remote table "courses" */
export type Courses_Arr_Rel_Insert_Input = {
   data: Array<Courses_Insert_Input>;
   /** on conflict condition */
   on_conflict?: Maybe<Courses_On_Conflict>;
};

/** aggregate avg on columns */
export type Courses_Avg_Fields = {
   __typename?: 'courses_avg_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by avg() on columns of table "courses" */
export type Courses_Avg_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** Boolean expression to filter rows from the table "courses". All fields are combined with a logical 'AND'. */
export type Courses_Bool_Exp = {
   _and?: Maybe<Array<Courses_Bool_Exp>>;
   _not?: Maybe<Courses_Bool_Exp>;
   _or?: Maybe<Array<Courses_Bool_Exp>>;
   access_code?: Maybe<String_Comparison_Exp>;
   available?: Maybe<Boolean_Comparison_Exp>;
   background_color?: Maybe<String_Comparison_Exp>;
   banner_color?: Maybe<String_Comparison_Exp>;
   banner_image?: Maybe<String_Comparison_Exp>;
   description?: Maybe<String_Comparison_Exp>;
   duration?: Maybe<String_Comparison_Exp>;
   enrollments?: Maybe<Course_Enrollment_Bool_Exp>;
   id?: Maybe<Uuid_Comparison_Exp>;
   instructor?: Maybe<Users_Bool_Exp>;
   instructor_id?: Maybe<Int_Comparison_Exp>;
   level?: Maybe<String_Comparison_Exp>;
   management?: Maybe<Course_Management_Bool_Exp>;
   name?: Maybe<String_Comparison_Exp>;
   schedule?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "courses" */
export enum Courses_Constraint {
   /** unique or primary key constraint */
   CoursesPkey = 'courses_pkey'
}

/** input type for incrementing numeric columns in table "courses" */
export type Courses_Inc_Input = {
   instructor_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "courses" */
export type Courses_Insert_Input = {
   access_code?: Maybe<Scalars['String']>;
   available?: Maybe<Scalars['Boolean']>;
   background_color?: Maybe<Scalars['String']>;
   banner_color?: Maybe<Scalars['String']>;
   banner_image?: Maybe<Scalars['String']>;
   description?: Maybe<Scalars['String']>;
   duration?: Maybe<Scalars['String']>;
   enrollments?: Maybe<Course_Enrollment_Arr_Rel_Insert_Input>;
   id?: Maybe<Scalars['uuid']>;
   instructor?: Maybe<Users_Obj_Rel_Insert_Input>;
   instructor_id?: Maybe<Scalars['Int']>;
   level?: Maybe<Scalars['String']>;
   management?: Maybe<Course_Management_Arr_Rel_Insert_Input>;
   name?: Maybe<Scalars['String']>;
   schedule?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Courses_Max_Fields = {
   __typename?: 'courses_max_fields';
   access_code?: Maybe<Scalars['String']>;
   background_color?: Maybe<Scalars['String']>;
   banner_color?: Maybe<Scalars['String']>;
   banner_image?: Maybe<Scalars['String']>;
   description?: Maybe<Scalars['String']>;
   duration?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['uuid']>;
   instructor_id?: Maybe<Scalars['Int']>;
   level?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   schedule?: Maybe<Scalars['String']>;
};

/** order by max() on columns of table "courses" */
export type Courses_Max_Order_By = {
   access_code?: Maybe<Order_By>;
   background_color?: Maybe<Order_By>;
   banner_color?: Maybe<Order_By>;
   banner_image?: Maybe<Order_By>;
   description?: Maybe<Order_By>;
   duration?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   instructor_id?: Maybe<Order_By>;
   level?: Maybe<Order_By>;
   name?: Maybe<Order_By>;
   schedule?: Maybe<Order_By>;
};

/** aggregate min on columns */
export type Courses_Min_Fields = {
   __typename?: 'courses_min_fields';
   access_code?: Maybe<Scalars['String']>;
   background_color?: Maybe<Scalars['String']>;
   banner_color?: Maybe<Scalars['String']>;
   banner_image?: Maybe<Scalars['String']>;
   description?: Maybe<Scalars['String']>;
   duration?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['uuid']>;
   instructor_id?: Maybe<Scalars['Int']>;
   level?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   schedule?: Maybe<Scalars['String']>;
};

/** order by min() on columns of table "courses" */
export type Courses_Min_Order_By = {
   access_code?: Maybe<Order_By>;
   background_color?: Maybe<Order_By>;
   banner_color?: Maybe<Order_By>;
   banner_image?: Maybe<Order_By>;
   description?: Maybe<Order_By>;
   duration?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   instructor_id?: Maybe<Order_By>;
   level?: Maybe<Order_By>;
   name?: Maybe<Order_By>;
   schedule?: Maybe<Order_By>;
};

/** response of any mutation on the table "courses" */
export type Courses_Mutation_Response = {
   __typename?: 'courses_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Courses>;
};

/** input type for inserting object relation for remote table "courses" */
export type Courses_Obj_Rel_Insert_Input = {
   data: Courses_Insert_Input;
   /** on conflict condition */
   on_conflict?: Maybe<Courses_On_Conflict>;
};

/** on conflict condition type for table "courses" */
export type Courses_On_Conflict = {
   constraint: Courses_Constraint;
   update_columns?: Array<Courses_Update_Column>;
   where?: Maybe<Courses_Bool_Exp>;
};

/** Ordering options when selecting data from "courses". */
export type Courses_Order_By = {
   access_code?: Maybe<Order_By>;
   available?: Maybe<Order_By>;
   background_color?: Maybe<Order_By>;
   banner_color?: Maybe<Order_By>;
   banner_image?: Maybe<Order_By>;
   description?: Maybe<Order_By>;
   duration?: Maybe<Order_By>;
   enrollments_aggregate?: Maybe<Course_Enrollment_Aggregate_Order_By>;
   id?: Maybe<Order_By>;
   instructor?: Maybe<Users_Order_By>;
   instructor_id?: Maybe<Order_By>;
   level?: Maybe<Order_By>;
   management_aggregate?: Maybe<Course_Management_Aggregate_Order_By>;
   name?: Maybe<Order_By>;
   schedule?: Maybe<Order_By>;
};

/** primary key columns input for table: courses */
export type Courses_Pk_Columns_Input = {
   id: Scalars['uuid'];
};

/** select columns of table "courses" */
export enum Courses_Select_Column {
   /** column name */
   AccessCode = 'access_code',
   /** column name */
   Available = 'available',
   /** column name */
   BackgroundColor = 'background_color',
   /** column name */
   BannerColor = 'banner_color',
   /** column name */
   BannerImage = 'banner_image',
   /** column name */
   Description = 'description',
   /** column name */
   Duration = 'duration',
   /** column name */
   Id = 'id',
   /** column name */
   InstructorId = 'instructor_id',
   /** column name */
   Level = 'level',
   /** column name */
   Name = 'name',
   /** column name */
   Schedule = 'schedule'
}

/** input type for updating data in table "courses" */
export type Courses_Set_Input = {
   access_code?: Maybe<Scalars['String']>;
   available?: Maybe<Scalars['Boolean']>;
   background_color?: Maybe<Scalars['String']>;
   banner_color?: Maybe<Scalars['String']>;
   banner_image?: Maybe<Scalars['String']>;
   description?: Maybe<Scalars['String']>;
   duration?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['uuid']>;
   instructor_id?: Maybe<Scalars['Int']>;
   level?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   schedule?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Courses_Stddev_Fields = {
   __typename?: 'courses_stddev_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by stddev() on columns of table "courses" */
export type Courses_Stddev_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** aggregate stddev_pop on columns */
export type Courses_Stddev_Pop_Fields = {
   __typename?: 'courses_stddev_pop_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_pop() on columns of table "courses" */
export type Courses_Stddev_Pop_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** aggregate stddev_samp on columns */
export type Courses_Stddev_Samp_Fields = {
   __typename?: 'courses_stddev_samp_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by stddev_samp() on columns of table "courses" */
export type Courses_Stddev_Samp_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** aggregate sum on columns */
export type Courses_Sum_Fields = {
   __typename?: 'courses_sum_fields';
   instructor_id?: Maybe<Scalars['Int']>;
};

/** order by sum() on columns of table "courses" */
export type Courses_Sum_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** update columns of table "courses" */
export enum Courses_Update_Column {
   /** column name */
   AccessCode = 'access_code',
   /** column name */
   Available = 'available',
   /** column name */
   BackgroundColor = 'background_color',
   /** column name */
   BannerColor = 'banner_color',
   /** column name */
   BannerImage = 'banner_image',
   /** column name */
   Description = 'description',
   /** column name */
   Duration = 'duration',
   /** column name */
   Id = 'id',
   /** column name */
   InstructorId = 'instructor_id',
   /** column name */
   Level = 'level',
   /** column name */
   Name = 'name',
   /** column name */
   Schedule = 'schedule'
}

/** aggregate var_pop on columns */
export type Courses_Var_Pop_Fields = {
   __typename?: 'courses_var_pop_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by var_pop() on columns of table "courses" */
export type Courses_Var_Pop_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** aggregate var_samp on columns */
export type Courses_Var_Samp_Fields = {
   __typename?: 'courses_var_samp_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by var_samp() on columns of table "courses" */
export type Courses_Var_Samp_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** aggregate variance on columns */
export type Courses_Variance_Fields = {
   __typename?: 'courses_variance_fields';
   instructor_id?: Maybe<Scalars['Float']>;
};

/** order by variance() on columns of table "courses" */
export type Courses_Variance_Order_By = {
   instructor_id?: Maybe<Order_By>;
};

/** Boolean expression to compare columns of type "date". All fields are combined with logical 'AND'. */
export type Date_Comparison_Exp = {
   _eq?: Maybe<Scalars['date']>;
   _gt?: Maybe<Scalars['date']>;
   _gte?: Maybe<Scalars['date']>;
   _in?: Maybe<Array<Scalars['date']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['date']>;
   _lte?: Maybe<Scalars['date']>;
   _neq?: Maybe<Scalars['date']>;
   _nin?: Maybe<Array<Scalars['date']>>;
};

/** mutation root */
export type Mutation_Root = {
   __typename?: 'mutation_root';
   /** delete data from the table: "accounts" */
   delete_accounts?: Maybe<Accounts_Mutation_Response>;
   /** delete single row from the table: "accounts" */
   delete_accounts_by_pk?: Maybe<Accounts>;
   /** delete data from the table: "contacts" */
   delete_contacts?: Maybe<Contacts_Mutation_Response>;
   /** delete single row from the table: "contacts" */
   delete_contacts_by_pk?: Maybe<Contacts>;
   /** delete data from the table: "course_enrollment" */
   delete_course_enrollment?: Maybe<Course_Enrollment_Mutation_Response>;
   /** delete single row from the table: "course_enrollment" */
   delete_course_enrollment_by_pk?: Maybe<Course_Enrollment>;
   /** delete data from the table: "course_management" */
   delete_course_management?: Maybe<Course_Management_Mutation_Response>;
   /** delete single row from the table: "course_management" */
   delete_course_management_by_pk?: Maybe<Course_Management>;
   /** delete data from the table: "courses" */
   delete_courses?: Maybe<Courses_Mutation_Response>;
   /** delete single row from the table: "courses" */
   delete_courses_by_pk?: Maybe<Courses>;
   /** delete data from the table: "prospective_users" */
   delete_prospective_users?: Maybe<Prospective_Users_Mutation_Response>;
   /** delete single row from the table: "prospective_users" */
   delete_prospective_users_by_pk?: Maybe<Prospective_Users>;
   /** delete data from the table: "schools" */
   delete_schools?: Maybe<Schools_Mutation_Response>;
   /** delete single row from the table: "schools" */
   delete_schools_by_pk?: Maybe<Schools>;
   /** delete data from the table: "sessions" */
   delete_sessions?: Maybe<Sessions_Mutation_Response>;
   /** delete single row from the table: "sessions" */
   delete_sessions_by_pk?: Maybe<Sessions>;
   /** delete data from the table: "users" */
   delete_users?: Maybe<Users_Mutation_Response>;
   /** delete single row from the table: "users" */
   delete_users_by_pk?: Maybe<Users>;
   /** delete data from the table: "verification_requests" */
   delete_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
   /** delete single row from the table: "verification_requests" */
   delete_verification_requests_by_pk?: Maybe<Verification_Requests>;
   /** insert data into the table: "accounts" */
   insert_accounts?: Maybe<Accounts_Mutation_Response>;
   /** insert a single row into the table: "accounts" */
   insert_accounts_one?: Maybe<Accounts>;
   /** insert data into the table: "contacts" */
   insert_contacts?: Maybe<Contacts_Mutation_Response>;
   /** insert a single row into the table: "contacts" */
   insert_contacts_one?: Maybe<Contacts>;
   /** insert data into the table: "course_enrollment" */
   insert_course_enrollment?: Maybe<Course_Enrollment_Mutation_Response>;
   /** insert a single row into the table: "course_enrollment" */
   insert_course_enrollment_one?: Maybe<Course_Enrollment>;
   /** insert data into the table: "course_management" */
   insert_course_management?: Maybe<Course_Management_Mutation_Response>;
   /** insert a single row into the table: "course_management" */
   insert_course_management_one?: Maybe<Course_Management>;
   /** insert data into the table: "courses" */
   insert_courses?: Maybe<Courses_Mutation_Response>;
   /** insert a single row into the table: "courses" */
   insert_courses_one?: Maybe<Courses>;
   /** insert data into the table: "prospective_users" */
   insert_prospective_users?: Maybe<Prospective_Users_Mutation_Response>;
   /** insert a single row into the table: "prospective_users" */
   insert_prospective_users_one?: Maybe<Prospective_Users>;
   /** insert data into the table: "schools" */
   insert_schools?: Maybe<Schools_Mutation_Response>;
   /** insert a single row into the table: "schools" */
   insert_schools_one?: Maybe<Schools>;
   /** insert data into the table: "sessions" */
   insert_sessions?: Maybe<Sessions_Mutation_Response>;
   /** insert a single row into the table: "sessions" */
   insert_sessions_one?: Maybe<Sessions>;
   /** insert data into the table: "users" */
   insert_users?: Maybe<Users_Mutation_Response>;
   /** insert a single row into the table: "users" */
   insert_users_one?: Maybe<Users>;
   /** insert data into the table: "verification_requests" */
   insert_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
   /** insert a single row into the table: "verification_requests" */
   insert_verification_requests_one?: Maybe<Verification_Requests>;
   /** update data of the table: "accounts" */
   update_accounts?: Maybe<Accounts_Mutation_Response>;
   /** update single row of the table: "accounts" */
   update_accounts_by_pk?: Maybe<Accounts>;
   /** update data of the table: "contacts" */
   update_contacts?: Maybe<Contacts_Mutation_Response>;
   /** update single row of the table: "contacts" */
   update_contacts_by_pk?: Maybe<Contacts>;
   /** update data of the table: "course_enrollment" */
   update_course_enrollment?: Maybe<Course_Enrollment_Mutation_Response>;
   /** update single row of the table: "course_enrollment" */
   update_course_enrollment_by_pk?: Maybe<Course_Enrollment>;
   /** update data of the table: "course_management" */
   update_course_management?: Maybe<Course_Management_Mutation_Response>;
   /** update single row of the table: "course_management" */
   update_course_management_by_pk?: Maybe<Course_Management>;
   /** update data of the table: "courses" */
   update_courses?: Maybe<Courses_Mutation_Response>;
   /** update single row of the table: "courses" */
   update_courses_by_pk?: Maybe<Courses>;
   /** update data of the table: "prospective_users" */
   update_prospective_users?: Maybe<Prospective_Users_Mutation_Response>;
   /** update single row of the table: "prospective_users" */
   update_prospective_users_by_pk?: Maybe<Prospective_Users>;
   /** update data of the table: "schools" */
   update_schools?: Maybe<Schools_Mutation_Response>;
   /** update single row of the table: "schools" */
   update_schools_by_pk?: Maybe<Schools>;
   /** update data of the table: "sessions" */
   update_sessions?: Maybe<Sessions_Mutation_Response>;
   /** update single row of the table: "sessions" */
   update_sessions_by_pk?: Maybe<Sessions>;
   /** update data of the table: "users" */
   update_users?: Maybe<Users_Mutation_Response>;
   /** update single row of the table: "users" */
   update_users_by_pk?: Maybe<Users>;
   /** update data of the table: "verification_requests" */
   update_verification_requests?: Maybe<Verification_Requests_Mutation_Response>;
   /** update single row of the table: "verification_requests" */
   update_verification_requests_by_pk?: Maybe<Verification_Requests>;
};


/** mutation root */
export type Mutation_RootDelete_AccountsArgs = {
   where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Accounts_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_ContactsArgs = {
   where: Contacts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Contacts_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Course_EnrollmentArgs = {
   where: Course_Enrollment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Course_Enrollment_By_PkArgs = {
   id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Course_ManagementArgs = {
   where: Course_Management_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Course_Management_By_PkArgs = {
   id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_CoursesArgs = {
   where: Courses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Courses_By_PkArgs = {
   id: Scalars['uuid'];
};


/** mutation root */
export type Mutation_RootDelete_Prospective_UsersArgs = {
   where: Prospective_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Prospective_Users_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_SchoolsArgs = {
   where: Schools_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Schools_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_SessionsArgs = {
   where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Sessions_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_UsersArgs = {
   where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Users_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootDelete_Verification_RequestsArgs = {
   where: Verification_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootDelete_Verification_Requests_By_PkArgs = {
   id: Scalars['Int'];
};


/** mutation root */
export type Mutation_RootInsert_AccountsArgs = {
   objects: Array<Accounts_Insert_Input>;
   on_conflict?: Maybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Accounts_OneArgs = {
   object: Accounts_Insert_Input;
   on_conflict?: Maybe<Accounts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_ContactsArgs = {
   objects: Array<Contacts_Insert_Input>;
   on_conflict?: Maybe<Contacts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Contacts_OneArgs = {
   object: Contacts_Insert_Input;
   on_conflict?: Maybe<Contacts_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_EnrollmentArgs = {
   objects: Array<Course_Enrollment_Insert_Input>;
   on_conflict?: Maybe<Course_Enrollment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_Enrollment_OneArgs = {
   object: Course_Enrollment_Insert_Input;
   on_conflict?: Maybe<Course_Enrollment_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_ManagementArgs = {
   objects: Array<Course_Management_Insert_Input>;
   on_conflict?: Maybe<Course_Management_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Course_Management_OneArgs = {
   object: Course_Management_Insert_Input;
   on_conflict?: Maybe<Course_Management_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_CoursesArgs = {
   objects: Array<Courses_Insert_Input>;
   on_conflict?: Maybe<Courses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Courses_OneArgs = {
   object: Courses_Insert_Input;
   on_conflict?: Maybe<Courses_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Prospective_UsersArgs = {
   objects: Array<Prospective_Users_Insert_Input>;
   on_conflict?: Maybe<Prospective_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Prospective_Users_OneArgs = {
   object: Prospective_Users_Insert_Input;
   on_conflict?: Maybe<Prospective_Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SchoolsArgs = {
   objects: Array<Schools_Insert_Input>;
   on_conflict?: Maybe<Schools_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Schools_OneArgs = {
   object: Schools_Insert_Input;
   on_conflict?: Maybe<Schools_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_SessionsArgs = {
   objects: Array<Sessions_Insert_Input>;
   on_conflict?: Maybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Sessions_OneArgs = {
   object: Sessions_Insert_Input;
   on_conflict?: Maybe<Sessions_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_UsersArgs = {
   objects: Array<Users_Insert_Input>;
   on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Users_OneArgs = {
   object: Users_Insert_Input;
   on_conflict?: Maybe<Users_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Verification_RequestsArgs = {
   objects: Array<Verification_Requests_Insert_Input>;
   on_conflict?: Maybe<Verification_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootInsert_Verification_Requests_OneArgs = {
   object: Verification_Requests_Insert_Input;
   on_conflict?: Maybe<Verification_Requests_On_Conflict>;
};


/** mutation root */
export type Mutation_RootUpdate_AccountsArgs = {
   _inc?: Maybe<Accounts_Inc_Input>;
   _set?: Maybe<Accounts_Set_Input>;
   where: Accounts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Accounts_By_PkArgs = {
   _inc?: Maybe<Accounts_Inc_Input>;
   _set?: Maybe<Accounts_Set_Input>;
   pk_columns: Accounts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_ContactsArgs = {
   _inc?: Maybe<Contacts_Inc_Input>;
   _set?: Maybe<Contacts_Set_Input>;
   where: Contacts_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Contacts_By_PkArgs = {
   _inc?: Maybe<Contacts_Inc_Input>;
   _set?: Maybe<Contacts_Set_Input>;
   pk_columns: Contacts_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Course_EnrollmentArgs = {
   _inc?: Maybe<Course_Enrollment_Inc_Input>;
   _set?: Maybe<Course_Enrollment_Set_Input>;
   where: Course_Enrollment_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Course_Enrollment_By_PkArgs = {
   _inc?: Maybe<Course_Enrollment_Inc_Input>;
   _set?: Maybe<Course_Enrollment_Set_Input>;
   pk_columns: Course_Enrollment_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Course_ManagementArgs = {
   _inc?: Maybe<Course_Management_Inc_Input>;
   _set?: Maybe<Course_Management_Set_Input>;
   where: Course_Management_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Course_Management_By_PkArgs = {
   _inc?: Maybe<Course_Management_Inc_Input>;
   _set?: Maybe<Course_Management_Set_Input>;
   pk_columns: Course_Management_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_CoursesArgs = {
   _inc?: Maybe<Courses_Inc_Input>;
   _set?: Maybe<Courses_Set_Input>;
   where: Courses_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Courses_By_PkArgs = {
   _inc?: Maybe<Courses_Inc_Input>;
   _set?: Maybe<Courses_Set_Input>;
   pk_columns: Courses_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Prospective_UsersArgs = {
   _inc?: Maybe<Prospective_Users_Inc_Input>;
   _set?: Maybe<Prospective_Users_Set_Input>;
   where: Prospective_Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Prospective_Users_By_PkArgs = {
   _inc?: Maybe<Prospective_Users_Inc_Input>;
   _set?: Maybe<Prospective_Users_Set_Input>;
   pk_columns: Prospective_Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SchoolsArgs = {
   _inc?: Maybe<Schools_Inc_Input>;
   _set?: Maybe<Schools_Set_Input>;
   where: Schools_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Schools_By_PkArgs = {
   _inc?: Maybe<Schools_Inc_Input>;
   _set?: Maybe<Schools_Set_Input>;
   pk_columns: Schools_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_SessionsArgs = {
   _inc?: Maybe<Sessions_Inc_Input>;
   _set?: Maybe<Sessions_Set_Input>;
   where: Sessions_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Sessions_By_PkArgs = {
   _inc?: Maybe<Sessions_Inc_Input>;
   _set?: Maybe<Sessions_Set_Input>;
   pk_columns: Sessions_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_UsersArgs = {
   _inc?: Maybe<Users_Inc_Input>;
   _set?: Maybe<Users_Set_Input>;
   where: Users_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Users_By_PkArgs = {
   _inc?: Maybe<Users_Inc_Input>;
   _set?: Maybe<Users_Set_Input>;
   pk_columns: Users_Pk_Columns_Input;
};


/** mutation root */
export type Mutation_RootUpdate_Verification_RequestsArgs = {
   _inc?: Maybe<Verification_Requests_Inc_Input>;
   _set?: Maybe<Verification_Requests_Set_Input>;
   where: Verification_Requests_Bool_Exp;
};


/** mutation root */
export type Mutation_RootUpdate_Verification_Requests_By_PkArgs = {
   _inc?: Maybe<Verification_Requests_Inc_Input>;
   _set?: Maybe<Verification_Requests_Set_Input>;
   pk_columns: Verification_Requests_Pk_Columns_Input;
};

/** Boolean expression to compare columns of type "numeric". All fields are combined with logical 'AND'. */
export type Numeric_Comparison_Exp = {
   _eq?: Maybe<Scalars['numeric']>;
   _gt?: Maybe<Scalars['numeric']>;
   _gte?: Maybe<Scalars['numeric']>;
   _in?: Maybe<Array<Scalars['numeric']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['numeric']>;
   _lte?: Maybe<Scalars['numeric']>;
   _neq?: Maybe<Scalars['numeric']>;
   _nin?: Maybe<Array<Scalars['numeric']>>;
};

/** column ordering options */
export enum Order_By {
   /** in ascending order, nulls last */
   Asc = 'asc',
   /** in ascending order, nulls first */
   AscNullsFirst = 'asc_nulls_first',
   /** in ascending order, nulls last */
   AscNullsLast = 'asc_nulls_last',
   /** in descending order, nulls first */
   Desc = 'desc',
   /** in descending order, nulls first */
   DescNullsFirst = 'desc_nulls_first',
   /** in descending order, nulls last */
   DescNullsLast = 'desc_nulls_last'
}

/** columns and relationships of "prospective_users" */
export type Prospective_Users = {
   __typename?: 'prospective_users';
   code?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   first_name: Scalars['String'];
   id: Scalars['Int'];
   is_active: Scalars['Boolean'];
   last_name: Scalars['String'];
   middle_name?: Maybe<Scalars['String']>;
   registration_step: Scalars['Int'];
   role?: Maybe<Scalars['String']>;
   /** An object relationship */
   school?: Maybe<Schools>;
   school_id: Scalars['Int'];
   student_id: Scalars['String'];
   username: Scalars['String'];
};

/** aggregated selection of "prospective_users" */
export type Prospective_Users_Aggregate = {
   __typename?: 'prospective_users_aggregate';
   aggregate?: Maybe<Prospective_Users_Aggregate_Fields>;
   nodes: Array<Prospective_Users>;
};

/** aggregate fields of "prospective_users" */
export type Prospective_Users_Aggregate_Fields = {
   __typename?: 'prospective_users_aggregate_fields';
   avg?: Maybe<Prospective_Users_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Prospective_Users_Max_Fields>;
   min?: Maybe<Prospective_Users_Min_Fields>;
   stddev?: Maybe<Prospective_Users_Stddev_Fields>;
   stddev_pop?: Maybe<Prospective_Users_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Prospective_Users_Stddev_Samp_Fields>;
   sum?: Maybe<Prospective_Users_Sum_Fields>;
   var_pop?: Maybe<Prospective_Users_Var_Pop_Fields>;
   var_samp?: Maybe<Prospective_Users_Var_Samp_Fields>;
   variance?: Maybe<Prospective_Users_Variance_Fields>;
};


/** aggregate fields of "prospective_users" */
export type Prospective_Users_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Prospective_Users_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Prospective_Users_Avg_Fields = {
   __typename?: 'prospective_users_avg_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "prospective_users". All fields are combined with a logical 'AND'. */
export type Prospective_Users_Bool_Exp = {
   _and?: Maybe<Array<Prospective_Users_Bool_Exp>>;
   _not?: Maybe<Prospective_Users_Bool_Exp>;
   _or?: Maybe<Array<Prospective_Users_Bool_Exp>>;
   code?: Maybe<String_Comparison_Exp>;
   email?: Maybe<String_Comparison_Exp>;
   first_name?: Maybe<String_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   is_active?: Maybe<Boolean_Comparison_Exp>;
   last_name?: Maybe<String_Comparison_Exp>;
   middle_name?: Maybe<String_Comparison_Exp>;
   registration_step?: Maybe<Int_Comparison_Exp>;
   role?: Maybe<String_Comparison_Exp>;
   school?: Maybe<Schools_Bool_Exp>;
   school_id?: Maybe<Int_Comparison_Exp>;
   student_id?: Maybe<String_Comparison_Exp>;
   username?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "prospective_users" */
export enum Prospective_Users_Constraint {
   /** unique or primary key constraint */
   ProspectiveUsersPkey = 'prospective_users_pkey',
   /** unique or primary key constraint */
   ProspectiveUsersStudentIdKey = 'prospective_users_student_id_key',
   /** unique or primary key constraint */
   ProspectiveUsersUsernameKey = 'prospective_users_username_key'
}

/** input type for incrementing numeric columns in table "prospective_users" */
export type Prospective_Users_Inc_Input = {
   id?: Maybe<Scalars['Int']>;
   registration_step?: Maybe<Scalars['Int']>;
   school_id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "prospective_users" */
export type Prospective_Users_Insert_Input = {
   code?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   is_active?: Maybe<Scalars['Boolean']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   registration_step?: Maybe<Scalars['Int']>;
   role?: Maybe<Scalars['String']>;
   school?: Maybe<Schools_Obj_Rel_Insert_Input>;
   school_id?: Maybe<Scalars['Int']>;
   student_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Prospective_Users_Max_Fields = {
   __typename?: 'prospective_users_max_fields';
   code?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   registration_step?: Maybe<Scalars['Int']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   student_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Prospective_Users_Min_Fields = {
   __typename?: 'prospective_users_min_fields';
   code?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   registration_step?: Maybe<Scalars['Int']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   student_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "prospective_users" */
export type Prospective_Users_Mutation_Response = {
   __typename?: 'prospective_users_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Prospective_Users>;
};

/** on conflict condition type for table "prospective_users" */
export type Prospective_Users_On_Conflict = {
   constraint: Prospective_Users_Constraint;
   update_columns?: Array<Prospective_Users_Update_Column>;
   where?: Maybe<Prospective_Users_Bool_Exp>;
};

/** Ordering options when selecting data from "prospective_users". */
export type Prospective_Users_Order_By = {
   code?: Maybe<Order_By>;
   email?: Maybe<Order_By>;
   first_name?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   is_active?: Maybe<Order_By>;
   last_name?: Maybe<Order_By>;
   middle_name?: Maybe<Order_By>;
   registration_step?: Maybe<Order_By>;
   role?: Maybe<Order_By>;
   school?: Maybe<Schools_Order_By>;
   school_id?: Maybe<Order_By>;
   student_id?: Maybe<Order_By>;
   username?: Maybe<Order_By>;
};

/** primary key columns input for table: prospective_users */
export type Prospective_Users_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "prospective_users" */
export enum Prospective_Users_Select_Column {
   /** column name */
   Code = 'code',
   /** column name */
   Email = 'email',
   /** column name */
   FirstName = 'first_name',
   /** column name */
   Id = 'id',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   LastName = 'last_name',
   /** column name */
   MiddleName = 'middle_name',
   /** column name */
   RegistrationStep = 'registration_step',
   /** column name */
   Role = 'role',
   /** column name */
   SchoolId = 'school_id',
   /** column name */
   StudentId = 'student_id',
   /** column name */
   Username = 'username'
}

/** input type for updating data in table "prospective_users" */
export type Prospective_Users_Set_Input = {
   code?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   is_active?: Maybe<Scalars['Boolean']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   registration_step?: Maybe<Scalars['Int']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   student_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Prospective_Users_Stddev_Fields = {
   __typename?: 'prospective_users_stddev_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Prospective_Users_Stddev_Pop_Fields = {
   __typename?: 'prospective_users_stddev_pop_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Prospective_Users_Stddev_Samp_Fields = {
   __typename?: 'prospective_users_stddev_samp_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Prospective_Users_Sum_Fields = {
   __typename?: 'prospective_users_sum_fields';
   id?: Maybe<Scalars['Int']>;
   registration_step?: Maybe<Scalars['Int']>;
   school_id?: Maybe<Scalars['Int']>;
};

/** update columns of table "prospective_users" */
export enum Prospective_Users_Update_Column {
   /** column name */
   Code = 'code',
   /** column name */
   Email = 'email',
   /** column name */
   FirstName = 'first_name',
   /** column name */
   Id = 'id',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   LastName = 'last_name',
   /** column name */
   MiddleName = 'middle_name',
   /** column name */
   RegistrationStep = 'registration_step',
   /** column name */
   Role = 'role',
   /** column name */
   SchoolId = 'school_id',
   /** column name */
   StudentId = 'student_id',
   /** column name */
   Username = 'username'
}

/** aggregate var_pop on columns */
export type Prospective_Users_Var_Pop_Fields = {
   __typename?: 'prospective_users_var_pop_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Prospective_Users_Var_Samp_Fields = {
   __typename?: 'prospective_users_var_samp_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Prospective_Users_Variance_Fields = {
   __typename?: 'prospective_users_variance_fields';
   id?: Maybe<Scalars['Float']>;
   registration_step?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
};

export type Query_Root = {
   __typename?: 'query_root';
   /** fetch data from the table: "accounts" */
   accounts: Array<Accounts>;
   /** fetch aggregated fields from the table: "accounts" */
   accounts_aggregate: Accounts_Aggregate;
   /** fetch data from the table: "accounts" using primary key columns */
   accounts_by_pk?: Maybe<Accounts>;
   /** fetch data from the table: "contacts" */
   contacts: Array<Contacts>;
   /** fetch aggregated fields from the table: "contacts" */
   contacts_aggregate: Contacts_Aggregate;
   /** fetch data from the table: "contacts" using primary key columns */
   contacts_by_pk?: Maybe<Contacts>;
   /** fetch data from the table: "course_enrollment" */
   course_enrollment: Array<Course_Enrollment>;
   /** fetch aggregated fields from the table: "course_enrollment" */
   course_enrollment_aggregate: Course_Enrollment_Aggregate;
   /** fetch data from the table: "course_enrollment" using primary key columns */
   course_enrollment_by_pk?: Maybe<Course_Enrollment>;
   /** fetch data from the table: "course_management" */
   course_management: Array<Course_Management>;
   /** fetch aggregated fields from the table: "course_management" */
   course_management_aggregate: Course_Management_Aggregate;
   /** fetch data from the table: "course_management" using primary key columns */
   course_management_by_pk?: Maybe<Course_Management>;
   /** fetch data from the table: "courses" */
   courses: Array<Courses>;
   /** fetch aggregated fields from the table: "courses" */
   courses_aggregate: Courses_Aggregate;
   /** fetch data from the table: "courses" using primary key columns */
   courses_by_pk?: Maybe<Courses>;
   /** fetch data from the table: "prospective_users" */
   prospective_users: Array<Prospective_Users>;
   /** fetch aggregated fields from the table: "prospective_users" */
   prospective_users_aggregate: Prospective_Users_Aggregate;
   /** fetch data from the table: "prospective_users" using primary key columns */
   prospective_users_by_pk?: Maybe<Prospective_Users>;
   /** fetch data from the table: "schools" */
   schools: Array<Schools>;
   /** fetch aggregated fields from the table: "schools" */
   schools_aggregate: Schools_Aggregate;
   /** fetch data from the table: "schools" using primary key columns */
   schools_by_pk?: Maybe<Schools>;
   /** fetch data from the table: "sessions" */
   sessions: Array<Sessions>;
   /** fetch aggregated fields from the table: "sessions" */
   sessions_aggregate: Sessions_Aggregate;
   /** fetch data from the table: "sessions" using primary key columns */
   sessions_by_pk?: Maybe<Sessions>;
   /** fetch data from the table: "users" */
   users: Array<Users>;
   /** fetch aggregated fields from the table: "users" */
   users_aggregate: Users_Aggregate;
   /** fetch data from the table: "users" using primary key columns */
   users_by_pk?: Maybe<Users>;
   /** fetch data from the table: "verification_requests" */
   verification_requests: Array<Verification_Requests>;
   /** fetch aggregated fields from the table: "verification_requests" */
   verification_requests_aggregate: Verification_Requests_Aggregate;
   /** fetch data from the table: "verification_requests" using primary key columns */
   verification_requests_by_pk?: Maybe<Verification_Requests>;
};


export type Query_RootAccountsArgs = {
   distinct_on?: Maybe<Array<Accounts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Accounts_Order_By>>;
   where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_AggregateArgs = {
   distinct_on?: Maybe<Array<Accounts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Accounts_Order_By>>;
   where?: Maybe<Accounts_Bool_Exp>;
};


export type Query_RootAccounts_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootContactsArgs = {
   distinct_on?: Maybe<Array<Contacts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Contacts_Order_By>>;
   where?: Maybe<Contacts_Bool_Exp>;
};


export type Query_RootContacts_AggregateArgs = {
   distinct_on?: Maybe<Array<Contacts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Contacts_Order_By>>;
   where?: Maybe<Contacts_Bool_Exp>;
};


export type Query_RootContacts_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootCourse_EnrollmentArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


export type Query_RootCourse_Enrollment_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


export type Query_RootCourse_Enrollment_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Query_RootCourse_ManagementArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


export type Query_RootCourse_Management_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


export type Query_RootCourse_Management_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Query_RootCoursesArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};


export type Query_RootCourses_AggregateArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};


export type Query_RootCourses_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Query_RootProspective_UsersArgs = {
   distinct_on?: Maybe<Array<Prospective_Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Prospective_Users_Order_By>>;
   where?: Maybe<Prospective_Users_Bool_Exp>;
};


export type Query_RootProspective_Users_AggregateArgs = {
   distinct_on?: Maybe<Array<Prospective_Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Prospective_Users_Order_By>>;
   where?: Maybe<Prospective_Users_Bool_Exp>;
};


export type Query_RootProspective_Users_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootSchoolsArgs = {
   distinct_on?: Maybe<Array<Schools_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Schools_Order_By>>;
   where?: Maybe<Schools_Bool_Exp>;
};


export type Query_RootSchools_AggregateArgs = {
   distinct_on?: Maybe<Array<Schools_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Schools_Order_By>>;
   where?: Maybe<Schools_Bool_Exp>;
};


export type Query_RootSchools_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootSessionsArgs = {
   distinct_on?: Maybe<Array<Sessions_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Sessions_Order_By>>;
   where?: Maybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_AggregateArgs = {
   distinct_on?: Maybe<Array<Sessions_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Sessions_Order_By>>;
   where?: Maybe<Sessions_Bool_Exp>;
};


export type Query_RootSessions_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootUsersArgs = {
   distinct_on?: Maybe<Array<Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Users_Order_By>>;
   where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_AggregateArgs = {
   distinct_on?: Maybe<Array<Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Users_Order_By>>;
   where?: Maybe<Users_Bool_Exp>;
};


export type Query_RootUsers_By_PkArgs = {
   id: Scalars['Int'];
};


export type Query_RootVerification_RequestsArgs = {
   distinct_on?: Maybe<Array<Verification_Requests_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Verification_Requests_Order_By>>;
   where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Query_RootVerification_Requests_AggregateArgs = {
   distinct_on?: Maybe<Array<Verification_Requests_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Verification_Requests_Order_By>>;
   where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Query_RootVerification_Requests_By_PkArgs = {
   id: Scalars['Int'];
};

/** columns and relationships of "schools" */
export type Schools = {
   __typename?: 'schools';
   id: Scalars['Int'];
   is_active: Scalars['Boolean'];
   name: Scalars['String'];
   short_name: Scalars['String'];
   type: Scalars['Int'];
};

/** aggregated selection of "schools" */
export type Schools_Aggregate = {
   __typename?: 'schools_aggregate';
   aggregate?: Maybe<Schools_Aggregate_Fields>;
   nodes: Array<Schools>;
};

/** aggregate fields of "schools" */
export type Schools_Aggregate_Fields = {
   __typename?: 'schools_aggregate_fields';
   avg?: Maybe<Schools_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Schools_Max_Fields>;
   min?: Maybe<Schools_Min_Fields>;
   stddev?: Maybe<Schools_Stddev_Fields>;
   stddev_pop?: Maybe<Schools_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Schools_Stddev_Samp_Fields>;
   sum?: Maybe<Schools_Sum_Fields>;
   var_pop?: Maybe<Schools_Var_Pop_Fields>;
   var_samp?: Maybe<Schools_Var_Samp_Fields>;
   variance?: Maybe<Schools_Variance_Fields>;
};


/** aggregate fields of "schools" */
export type Schools_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Schools_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Schools_Avg_Fields = {
   __typename?: 'schools_avg_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "schools". All fields are combined with a logical 'AND'. */
export type Schools_Bool_Exp = {
   _and?: Maybe<Array<Schools_Bool_Exp>>;
   _not?: Maybe<Schools_Bool_Exp>;
   _or?: Maybe<Array<Schools_Bool_Exp>>;
   id?: Maybe<Int_Comparison_Exp>;
   is_active?: Maybe<Boolean_Comparison_Exp>;
   name?: Maybe<String_Comparison_Exp>;
   short_name?: Maybe<String_Comparison_Exp>;
   type?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "schools" */
export enum Schools_Constraint {
   /** unique or primary key constraint */
   SchoolsPkey = 'schools_pkey',
   /** unique or primary key constraint */
   SchoolsShortNameKey = 'schools_short_name_key'
}

/** input type for incrementing numeric columns in table "schools" */
export type Schools_Inc_Input = {
   id?: Maybe<Scalars['Int']>;
   type?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "schools" */
export type Schools_Insert_Input = {
   id?: Maybe<Scalars['Int']>;
   is_active?: Maybe<Scalars['Boolean']>;
   name?: Maybe<Scalars['String']>;
   short_name?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Schools_Max_Fields = {
   __typename?: 'schools_max_fields';
   id?: Maybe<Scalars['Int']>;
   name?: Maybe<Scalars['String']>;
   short_name?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Schools_Min_Fields = {
   __typename?: 'schools_min_fields';
   id?: Maybe<Scalars['Int']>;
   name?: Maybe<Scalars['String']>;
   short_name?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "schools" */
export type Schools_Mutation_Response = {
   __typename?: 'schools_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Schools>;
};

/** input type for inserting object relation for remote table "schools" */
export type Schools_Obj_Rel_Insert_Input = {
   data: Schools_Insert_Input;
   /** on conflict condition */
   on_conflict?: Maybe<Schools_On_Conflict>;
};

/** on conflict condition type for table "schools" */
export type Schools_On_Conflict = {
   constraint: Schools_Constraint;
   update_columns?: Array<Schools_Update_Column>;
   where?: Maybe<Schools_Bool_Exp>;
};

/** Ordering options when selecting data from "schools". */
export type Schools_Order_By = {
   id?: Maybe<Order_By>;
   is_active?: Maybe<Order_By>;
   name?: Maybe<Order_By>;
   short_name?: Maybe<Order_By>;
   type?: Maybe<Order_By>;
};

/** primary key columns input for table: schools */
export type Schools_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "schools" */
export enum Schools_Select_Column {
   /** column name */
   Id = 'id',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   Name = 'name',
   /** column name */
   ShortName = 'short_name',
   /** column name */
   Type = 'type'
}

/** input type for updating data in table "schools" */
export type Schools_Set_Input = {
   id?: Maybe<Scalars['Int']>;
   is_active?: Maybe<Scalars['Boolean']>;
   name?: Maybe<Scalars['String']>;
   short_name?: Maybe<Scalars['String']>;
   type?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Schools_Stddev_Fields = {
   __typename?: 'schools_stddev_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Schools_Stddev_Pop_Fields = {
   __typename?: 'schools_stddev_pop_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Schools_Stddev_Samp_Fields = {
   __typename?: 'schools_stddev_samp_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Schools_Sum_Fields = {
   __typename?: 'schools_sum_fields';
   id?: Maybe<Scalars['Int']>;
   type?: Maybe<Scalars['Int']>;
};

/** update columns of table "schools" */
export enum Schools_Update_Column {
   /** column name */
   Id = 'id',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   Name = 'name',
   /** column name */
   ShortName = 'short_name',
   /** column name */
   Type = 'type'
}

/** aggregate var_pop on columns */
export type Schools_Var_Pop_Fields = {
   __typename?: 'schools_var_pop_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Schools_Var_Samp_Fields = {
   __typename?: 'schools_var_samp_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Schools_Variance_Fields = {
   __typename?: 'schools_variance_fields';
   id?: Maybe<Scalars['Float']>;
   type?: Maybe<Scalars['Float']>;
};

/** columns and relationships of "sessions" */
export type Sessions = {
   __typename?: 'sessions';
   accessToken?: Maybe<Scalars['String']>;
   expires: Scalars['timestamptz'];
   id: Scalars['Int'];
   sessionToken: Scalars['String'];
   userId: Scalars['Int'];
};

/** aggregated selection of "sessions" */
export type Sessions_Aggregate = {
   __typename?: 'sessions_aggregate';
   aggregate?: Maybe<Sessions_Aggregate_Fields>;
   nodes: Array<Sessions>;
};

/** aggregate fields of "sessions" */
export type Sessions_Aggregate_Fields = {
   __typename?: 'sessions_aggregate_fields';
   avg?: Maybe<Sessions_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Sessions_Max_Fields>;
   min?: Maybe<Sessions_Min_Fields>;
   stddev?: Maybe<Sessions_Stddev_Fields>;
   stddev_pop?: Maybe<Sessions_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Sessions_Stddev_Samp_Fields>;
   sum?: Maybe<Sessions_Sum_Fields>;
   var_pop?: Maybe<Sessions_Var_Pop_Fields>;
   var_samp?: Maybe<Sessions_Var_Samp_Fields>;
   variance?: Maybe<Sessions_Variance_Fields>;
};


/** aggregate fields of "sessions" */
export type Sessions_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Sessions_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Sessions_Avg_Fields = {
   __typename?: 'sessions_avg_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "sessions". All fields are combined with a logical 'AND'. */
export type Sessions_Bool_Exp = {
   _and?: Maybe<Array<Sessions_Bool_Exp>>;
   _not?: Maybe<Sessions_Bool_Exp>;
   _or?: Maybe<Array<Sessions_Bool_Exp>>;
   accessToken?: Maybe<String_Comparison_Exp>;
   expires?: Maybe<Timestamptz_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   sessionToken?: Maybe<String_Comparison_Exp>;
   userId?: Maybe<Int_Comparison_Exp>;
};

/** unique or primary key constraints on table "sessions" */
export enum Sessions_Constraint {
   /** unique or primary key constraint */
   SessionToken = 'session_token',
   /** unique or primary key constraint */
   SessionsPkey = 'sessions_pkey'
}

/** input type for incrementing numeric columns in table "sessions" */
export type Sessions_Inc_Input = {
   id?: Maybe<Scalars['Int']>;
   userId?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "sessions" */
export type Sessions_Insert_Input = {
   accessToken?: Maybe<Scalars['String']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   sessionToken?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate max on columns */
export type Sessions_Max_Fields = {
   __typename?: 'sessions_max_fields';
   accessToken?: Maybe<Scalars['String']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   sessionToken?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate min on columns */
export type Sessions_Min_Fields = {
   __typename?: 'sessions_min_fields';
   accessToken?: Maybe<Scalars['String']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   sessionToken?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** response of any mutation on the table "sessions" */
export type Sessions_Mutation_Response = {
   __typename?: 'sessions_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Sessions>;
};

/** on conflict condition type for table "sessions" */
export type Sessions_On_Conflict = {
   constraint: Sessions_Constraint;
   update_columns?: Array<Sessions_Update_Column>;
   where?: Maybe<Sessions_Bool_Exp>;
};

/** Ordering options when selecting data from "sessions". */
export type Sessions_Order_By = {
   accessToken?: Maybe<Order_By>;
   expires?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   sessionToken?: Maybe<Order_By>;
   userId?: Maybe<Order_By>;
};

/** primary key columns input for table: sessions */
export type Sessions_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "sessions" */
export enum Sessions_Select_Column {
   /** column name */
   AccessToken = 'accessToken',
   /** column name */
   Expires = 'expires',
   /** column name */
   Id = 'id',
   /** column name */
   SessionToken = 'sessionToken',
   /** column name */
   UserId = 'userId'
}

/** input type for updating data in table "sessions" */
export type Sessions_Set_Input = {
   accessToken?: Maybe<Scalars['String']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   sessionToken?: Maybe<Scalars['String']>;
   userId?: Maybe<Scalars['Int']>;
};

/** aggregate stddev on columns */
export type Sessions_Stddev_Fields = {
   __typename?: 'sessions_stddev_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Sessions_Stddev_Pop_Fields = {
   __typename?: 'sessions_stddev_pop_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Sessions_Stddev_Samp_Fields = {
   __typename?: 'sessions_stddev_samp_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Sessions_Sum_Fields = {
   __typename?: 'sessions_sum_fields';
   id?: Maybe<Scalars['Int']>;
   userId?: Maybe<Scalars['Int']>;
};

/** update columns of table "sessions" */
export enum Sessions_Update_Column {
   /** column name */
   AccessToken = 'accessToken',
   /** column name */
   Expires = 'expires',
   /** column name */
   Id = 'id',
   /** column name */
   SessionToken = 'sessionToken',
   /** column name */
   UserId = 'userId'
}

/** aggregate var_pop on columns */
export type Sessions_Var_Pop_Fields = {
   __typename?: 'sessions_var_pop_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Sessions_Var_Samp_Fields = {
   __typename?: 'sessions_var_samp_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Sessions_Variance_Fields = {
   __typename?: 'sessions_variance_fields';
   id?: Maybe<Scalars['Float']>;
   userId?: Maybe<Scalars['Float']>;
};

export type Subscription_Root = {
   __typename?: 'subscription_root';
   /** fetch data from the table: "accounts" */
   accounts: Array<Accounts>;
   /** fetch aggregated fields from the table: "accounts" */
   accounts_aggregate: Accounts_Aggregate;
   /** fetch data from the table: "accounts" using primary key columns */
   accounts_by_pk?: Maybe<Accounts>;
   /** fetch data from the table: "contacts" */
   contacts: Array<Contacts>;
   /** fetch aggregated fields from the table: "contacts" */
   contacts_aggregate: Contacts_Aggregate;
   /** fetch data from the table: "contacts" using primary key columns */
   contacts_by_pk?: Maybe<Contacts>;
   /** fetch data from the table: "course_enrollment" */
   course_enrollment: Array<Course_Enrollment>;
   /** fetch aggregated fields from the table: "course_enrollment" */
   course_enrollment_aggregate: Course_Enrollment_Aggregate;
   /** fetch data from the table: "course_enrollment" using primary key columns */
   course_enrollment_by_pk?: Maybe<Course_Enrollment>;
   /** fetch data from the table: "course_management" */
   course_management: Array<Course_Management>;
   /** fetch aggregated fields from the table: "course_management" */
   course_management_aggregate: Course_Management_Aggregate;
   /** fetch data from the table: "course_management" using primary key columns */
   course_management_by_pk?: Maybe<Course_Management>;
   /** fetch data from the table: "courses" */
   courses: Array<Courses>;
   /** fetch aggregated fields from the table: "courses" */
   courses_aggregate: Courses_Aggregate;
   /** fetch data from the table: "courses" using primary key columns */
   courses_by_pk?: Maybe<Courses>;
   /** fetch data from the table: "prospective_users" */
   prospective_users: Array<Prospective_Users>;
   /** fetch aggregated fields from the table: "prospective_users" */
   prospective_users_aggregate: Prospective_Users_Aggregate;
   /** fetch data from the table: "prospective_users" using primary key columns */
   prospective_users_by_pk?: Maybe<Prospective_Users>;
   /** fetch data from the table: "schools" */
   schools: Array<Schools>;
   /** fetch aggregated fields from the table: "schools" */
   schools_aggregate: Schools_Aggregate;
   /** fetch data from the table: "schools" using primary key columns */
   schools_by_pk?: Maybe<Schools>;
   /** fetch data from the table: "sessions" */
   sessions: Array<Sessions>;
   /** fetch aggregated fields from the table: "sessions" */
   sessions_aggregate: Sessions_Aggregate;
   /** fetch data from the table: "sessions" using primary key columns */
   sessions_by_pk?: Maybe<Sessions>;
   /** fetch data from the table: "users" */
   users: Array<Users>;
   /** fetch aggregated fields from the table: "users" */
   users_aggregate: Users_Aggregate;
   /** fetch data from the table: "users" using primary key columns */
   users_by_pk?: Maybe<Users>;
   /** fetch data from the table: "verification_requests" */
   verification_requests: Array<Verification_Requests>;
   /** fetch aggregated fields from the table: "verification_requests" */
   verification_requests_aggregate: Verification_Requests_Aggregate;
   /** fetch data from the table: "verification_requests" using primary key columns */
   verification_requests_by_pk?: Maybe<Verification_Requests>;
};


export type Subscription_RootAccountsArgs = {
   distinct_on?: Maybe<Array<Accounts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Accounts_Order_By>>;
   where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_AggregateArgs = {
   distinct_on?: Maybe<Array<Accounts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Accounts_Order_By>>;
   where?: Maybe<Accounts_Bool_Exp>;
};


export type Subscription_RootAccounts_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootContactsArgs = {
   distinct_on?: Maybe<Array<Contacts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Contacts_Order_By>>;
   where?: Maybe<Contacts_Bool_Exp>;
};


export type Subscription_RootContacts_AggregateArgs = {
   distinct_on?: Maybe<Array<Contacts_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Contacts_Order_By>>;
   where?: Maybe<Contacts_Bool_Exp>;
};


export type Subscription_RootContacts_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootCourse_EnrollmentArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


export type Subscription_RootCourse_Enrollment_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


export type Subscription_RootCourse_Enrollment_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Subscription_RootCourse_ManagementArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


export type Subscription_RootCourse_Management_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


export type Subscription_RootCourse_Management_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Subscription_RootCoursesArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};


export type Subscription_RootCourses_AggregateArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};


export type Subscription_RootCourses_By_PkArgs = {
   id: Scalars['uuid'];
};


export type Subscription_RootProspective_UsersArgs = {
   distinct_on?: Maybe<Array<Prospective_Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Prospective_Users_Order_By>>;
   where?: Maybe<Prospective_Users_Bool_Exp>;
};


export type Subscription_RootProspective_Users_AggregateArgs = {
   distinct_on?: Maybe<Array<Prospective_Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Prospective_Users_Order_By>>;
   where?: Maybe<Prospective_Users_Bool_Exp>;
};


export type Subscription_RootProspective_Users_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootSchoolsArgs = {
   distinct_on?: Maybe<Array<Schools_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Schools_Order_By>>;
   where?: Maybe<Schools_Bool_Exp>;
};


export type Subscription_RootSchools_AggregateArgs = {
   distinct_on?: Maybe<Array<Schools_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Schools_Order_By>>;
   where?: Maybe<Schools_Bool_Exp>;
};


export type Subscription_RootSchools_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootSessionsArgs = {
   distinct_on?: Maybe<Array<Sessions_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Sessions_Order_By>>;
   where?: Maybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_AggregateArgs = {
   distinct_on?: Maybe<Array<Sessions_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Sessions_Order_By>>;
   where?: Maybe<Sessions_Bool_Exp>;
};


export type Subscription_RootSessions_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootUsersArgs = {
   distinct_on?: Maybe<Array<Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Users_Order_By>>;
   where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_AggregateArgs = {
   distinct_on?: Maybe<Array<Users_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Users_Order_By>>;
   where?: Maybe<Users_Bool_Exp>;
};


export type Subscription_RootUsers_By_PkArgs = {
   id: Scalars['Int'];
};


export type Subscription_RootVerification_RequestsArgs = {
   distinct_on?: Maybe<Array<Verification_Requests_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Verification_Requests_Order_By>>;
   where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Subscription_RootVerification_Requests_AggregateArgs = {
   distinct_on?: Maybe<Array<Verification_Requests_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Verification_Requests_Order_By>>;
   where?: Maybe<Verification_Requests_Bool_Exp>;
};


export type Subscription_RootVerification_Requests_By_PkArgs = {
   id: Scalars['Int'];
};

/** Boolean expression to compare columns of type "timestamptz". All fields are combined with logical 'AND'. */
export type Timestamptz_Comparison_Exp = {
   _eq?: Maybe<Scalars['timestamptz']>;
   _gt?: Maybe<Scalars['timestamptz']>;
   _gte?: Maybe<Scalars['timestamptz']>;
   _in?: Maybe<Array<Scalars['timestamptz']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['timestamptz']>;
   _lte?: Maybe<Scalars['timestamptz']>;
   _neq?: Maybe<Scalars['timestamptz']>;
   _nin?: Maybe<Array<Scalars['timestamptz']>>;
};

/** columns and relationships of "users" */
export type Users = {
   __typename?: 'users';
   birthdate?: Maybe<Scalars['date']>;
   city?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   created_at: Scalars['timestamptz'];
   department?: Maybe<Scalars['String']>;
   education_level?: Maybe<Scalars['Int']>;
   email: Scalars['String'];
   email_verified?: Maybe<Scalars['Boolean']>;
   /** An array relationship */
   enrolled_courses: Array<Course_Enrollment>;
   /** An aggregate relationship */
   enrolled_courses_aggregate: Course_Enrollment_Aggregate;
   first_name?: Maybe<Scalars['String']>;
   gender?: Maybe<Scalars['Int']>;
   home_phone?: Maybe<Scalars['String']>;
   id: Scalars['Int'];
   image?: Maybe<Scalars['String']>;
   is_active: Scalars['Boolean'];
   job_title?: Maybe<Scalars['String']>;
   last_name?: Maybe<Scalars['String']>;
   /** An array relationship */
   managing_courses: Array<Course_Management>;
   /** An aggregate relationship */
   managing_courses_aggregate: Course_Management_Aggregate;
   middle_name?: Maybe<Scalars['String']>;
   mobile_phone?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   other_name?: Maybe<Scalars['String']>;
   /** An array relationship */
   own_courses: Array<Courses>;
   /** An aggregate relationship */
   own_courses_aggregate: Courses_Aggregate;
   password?: Maybe<Scalars['String']>;
   postal_code?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
   /** An object relationship */
   school?: Maybe<Schools>;
   school_id?: Maybe<Scalars['Int']>;
   state?: Maybe<Scalars['String']>;
   street_1?: Maybe<Scalars['String']>;
   street_2?: Maybe<Scalars['String']>;
   student_id?: Maybe<Scalars['String']>;
   suffix?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['Int']>;
   updated_at: Scalars['timestamptz'];
   user_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
   work_phone?: Maybe<Scalars['String']>;
};


/** columns and relationships of "users" */
export type UsersEnrolled_CoursesArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersEnrolled_Courses_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Enrollment_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Enrollment_Order_By>>;
   where?: Maybe<Course_Enrollment_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersManaging_CoursesArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersManaging_Courses_AggregateArgs = {
   distinct_on?: Maybe<Array<Course_Management_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Course_Management_Order_By>>;
   where?: Maybe<Course_Management_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOwn_CoursesArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};


/** columns and relationships of "users" */
export type UsersOwn_Courses_AggregateArgs = {
   distinct_on?: Maybe<Array<Courses_Select_Column>>;
   limit?: Maybe<Scalars['Int']>;
   offset?: Maybe<Scalars['Int']>;
   order_by?: Maybe<Array<Courses_Order_By>>;
   where?: Maybe<Courses_Bool_Exp>;
};

/** aggregated selection of "users" */
export type Users_Aggregate = {
   __typename?: 'users_aggregate';
   aggregate?: Maybe<Users_Aggregate_Fields>;
   nodes: Array<Users>;
};

/** aggregate fields of "users" */
export type Users_Aggregate_Fields = {
   __typename?: 'users_aggregate_fields';
   avg?: Maybe<Users_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Users_Max_Fields>;
   min?: Maybe<Users_Min_Fields>;
   stddev?: Maybe<Users_Stddev_Fields>;
   stddev_pop?: Maybe<Users_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Users_Stddev_Samp_Fields>;
   sum?: Maybe<Users_Sum_Fields>;
   var_pop?: Maybe<Users_Var_Pop_Fields>;
   var_samp?: Maybe<Users_Var_Samp_Fields>;
   variance?: Maybe<Users_Variance_Fields>;
};


/** aggregate fields of "users" */
export type Users_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Users_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Users_Avg_Fields = {
   __typename?: 'users_avg_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "users". All fields are combined with a logical 'AND'. */
export type Users_Bool_Exp = {
   _and?: Maybe<Array<Users_Bool_Exp>>;
   _not?: Maybe<Users_Bool_Exp>;
   _or?: Maybe<Array<Users_Bool_Exp>>;
   birthdate?: Maybe<Date_Comparison_Exp>;
   city?: Maybe<String_Comparison_Exp>;
   country?: Maybe<String_Comparison_Exp>;
   created_at?: Maybe<Timestamptz_Comparison_Exp>;
   department?: Maybe<String_Comparison_Exp>;
   education_level?: Maybe<Int_Comparison_Exp>;
   email?: Maybe<String_Comparison_Exp>;
   email_verified?: Maybe<Boolean_Comparison_Exp>;
   enrolled_courses?: Maybe<Course_Enrollment_Bool_Exp>;
   first_name?: Maybe<String_Comparison_Exp>;
   gender?: Maybe<Int_Comparison_Exp>;
   home_phone?: Maybe<String_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   image?: Maybe<String_Comparison_Exp>;
   is_active?: Maybe<Boolean_Comparison_Exp>;
   job_title?: Maybe<String_Comparison_Exp>;
   last_name?: Maybe<String_Comparison_Exp>;
   managing_courses?: Maybe<Course_Management_Bool_Exp>;
   middle_name?: Maybe<String_Comparison_Exp>;
   mobile_phone?: Maybe<String_Comparison_Exp>;
   name?: Maybe<String_Comparison_Exp>;
   other_name?: Maybe<String_Comparison_Exp>;
   own_courses?: Maybe<Courses_Bool_Exp>;
   password?: Maybe<String_Comparison_Exp>;
   postal_code?: Maybe<String_Comparison_Exp>;
   role?: Maybe<String_Comparison_Exp>;
   school?: Maybe<Schools_Bool_Exp>;
   school_id?: Maybe<Int_Comparison_Exp>;
   state?: Maybe<String_Comparison_Exp>;
   street_1?: Maybe<String_Comparison_Exp>;
   street_2?: Maybe<String_Comparison_Exp>;
   student_id?: Maybe<String_Comparison_Exp>;
   suffix?: Maybe<String_Comparison_Exp>;
   title?: Maybe<Int_Comparison_Exp>;
   updated_at?: Maybe<Timestamptz_Comparison_Exp>;
   user_id?: Maybe<String_Comparison_Exp>;
   username?: Maybe<String_Comparison_Exp>;
   work_phone?: Maybe<String_Comparison_Exp>;
};

/** unique or primary key constraints on table "users" */
export enum Users_Constraint {
   /** unique or primary key constraint */
   Email = 'email',
   /** unique or primary key constraint */
   UserEmailKey = 'user_email_key',
   /** unique or primary key constraint */
   UserPkey = 'user_pkey',
   /** unique or primary key constraint */
   UserStudentIdKey = 'user_student_id_key',
   /** unique or primary key constraint */
   UserUsernameKey = 'user_username_key'
}

/** input type for incrementing numeric columns in table "users" */
export type Users_Inc_Input = {
   education_level?: Maybe<Scalars['Int']>;
   gender?: Maybe<Scalars['Int']>;
   id?: Maybe<Scalars['Int']>;
   school_id?: Maybe<Scalars['Int']>;
   title?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "users" */
export type Users_Insert_Input = {
   birthdate?: Maybe<Scalars['date']>;
   city?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   department?: Maybe<Scalars['String']>;
   education_level?: Maybe<Scalars['Int']>;
   email?: Maybe<Scalars['String']>;
   email_verified?: Maybe<Scalars['Boolean']>;
   enrolled_courses?: Maybe<Course_Enrollment_Arr_Rel_Insert_Input>;
   first_name?: Maybe<Scalars['String']>;
   gender?: Maybe<Scalars['Int']>;
   home_phone?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   image?: Maybe<Scalars['String']>;
   is_active?: Maybe<Scalars['Boolean']>;
   job_title?: Maybe<Scalars['String']>;
   last_name?: Maybe<Scalars['String']>;
   managing_courses?: Maybe<Course_Management_Arr_Rel_Insert_Input>;
   middle_name?: Maybe<Scalars['String']>;
   mobile_phone?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   other_name?: Maybe<Scalars['String']>;
   own_courses?: Maybe<Courses_Arr_Rel_Insert_Input>;
   password?: Maybe<Scalars['String']>;
   postal_code?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
   school?: Maybe<Schools_Obj_Rel_Insert_Input>;
   school_id?: Maybe<Scalars['Int']>;
   state?: Maybe<Scalars['String']>;
   street_1?: Maybe<Scalars['String']>;
   street_2?: Maybe<Scalars['String']>;
   student_id?: Maybe<Scalars['String']>;
   suffix?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['Int']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
   user_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
   work_phone?: Maybe<Scalars['String']>;
};

/** aggregate max on columns */
export type Users_Max_Fields = {
   __typename?: 'users_max_fields';
   birthdate?: Maybe<Scalars['date']>;
   city?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   department?: Maybe<Scalars['String']>;
   education_level?: Maybe<Scalars['Int']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   gender?: Maybe<Scalars['Int']>;
   home_phone?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   image?: Maybe<Scalars['String']>;
   job_title?: Maybe<Scalars['String']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   mobile_phone?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   other_name?: Maybe<Scalars['String']>;
   password?: Maybe<Scalars['String']>;
   postal_code?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   state?: Maybe<Scalars['String']>;
   street_1?: Maybe<Scalars['String']>;
   street_2?: Maybe<Scalars['String']>;
   student_id?: Maybe<Scalars['String']>;
   suffix?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['Int']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
   user_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
   work_phone?: Maybe<Scalars['String']>;
};

/** aggregate min on columns */
export type Users_Min_Fields = {
   __typename?: 'users_min_fields';
   birthdate?: Maybe<Scalars['date']>;
   city?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   department?: Maybe<Scalars['String']>;
   education_level?: Maybe<Scalars['Int']>;
   email?: Maybe<Scalars['String']>;
   first_name?: Maybe<Scalars['String']>;
   gender?: Maybe<Scalars['Int']>;
   home_phone?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   image?: Maybe<Scalars['String']>;
   job_title?: Maybe<Scalars['String']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   mobile_phone?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   other_name?: Maybe<Scalars['String']>;
   password?: Maybe<Scalars['String']>;
   postal_code?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   state?: Maybe<Scalars['String']>;
   street_1?: Maybe<Scalars['String']>;
   street_2?: Maybe<Scalars['String']>;
   student_id?: Maybe<Scalars['String']>;
   suffix?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['Int']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
   user_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
   work_phone?: Maybe<Scalars['String']>;
};

/** response of any mutation on the table "users" */
export type Users_Mutation_Response = {
   __typename?: 'users_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Users>;
};

/** input type for inserting object relation for remote table "users" */
export type Users_Obj_Rel_Insert_Input = {
   data: Users_Insert_Input;
   /** on conflict condition */
   on_conflict?: Maybe<Users_On_Conflict>;
};

/** on conflict condition type for table "users" */
export type Users_On_Conflict = {
   constraint: Users_Constraint;
   update_columns?: Array<Users_Update_Column>;
   where?: Maybe<Users_Bool_Exp>;
};

/** Ordering options when selecting data from "users". */
export type Users_Order_By = {
   birthdate?: Maybe<Order_By>;
   city?: Maybe<Order_By>;
   country?: Maybe<Order_By>;
   created_at?: Maybe<Order_By>;
   department?: Maybe<Order_By>;
   education_level?: Maybe<Order_By>;
   email?: Maybe<Order_By>;
   email_verified?: Maybe<Order_By>;
   enrolled_courses_aggregate?: Maybe<Course_Enrollment_Aggregate_Order_By>;
   first_name?: Maybe<Order_By>;
   gender?: Maybe<Order_By>;
   home_phone?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   image?: Maybe<Order_By>;
   is_active?: Maybe<Order_By>;
   job_title?: Maybe<Order_By>;
   last_name?: Maybe<Order_By>;
   managing_courses_aggregate?: Maybe<Course_Management_Aggregate_Order_By>;
   middle_name?: Maybe<Order_By>;
   mobile_phone?: Maybe<Order_By>;
   name?: Maybe<Order_By>;
   other_name?: Maybe<Order_By>;
   own_courses_aggregate?: Maybe<Courses_Aggregate_Order_By>;
   password?: Maybe<Order_By>;
   postal_code?: Maybe<Order_By>;
   role?: Maybe<Order_By>;
   school?: Maybe<Schools_Order_By>;
   school_id?: Maybe<Order_By>;
   state?: Maybe<Order_By>;
   street_1?: Maybe<Order_By>;
   street_2?: Maybe<Order_By>;
   student_id?: Maybe<Order_By>;
   suffix?: Maybe<Order_By>;
   title?: Maybe<Order_By>;
   updated_at?: Maybe<Order_By>;
   user_id?: Maybe<Order_By>;
   username?: Maybe<Order_By>;
   work_phone?: Maybe<Order_By>;
};

/** primary key columns input for table: users */
export type Users_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "users" */
export enum Users_Select_Column {
   /** column name */
   Birthdate = 'birthdate',
   /** column name */
   City = 'city',
   /** column name */
   Country = 'country',
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Department = 'department',
   /** column name */
   EducationLevel = 'education_level',
   /** column name */
   Email = 'email',
   /** column name */
   EmailVerified = 'email_verified',
   /** column name */
   FirstName = 'first_name',
   /** column name */
   Gender = 'gender',
   /** column name */
   HomePhone = 'home_phone',
   /** column name */
   Id = 'id',
   /** column name */
   Image = 'image',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   JobTitle = 'job_title',
   /** column name */
   LastName = 'last_name',
   /** column name */
   MiddleName = 'middle_name',
   /** column name */
   MobilePhone = 'mobile_phone',
   /** column name */
   Name = 'name',
   /** column name */
   OtherName = 'other_name',
   /** column name */
   Password = 'password',
   /** column name */
   PostalCode = 'postal_code',
   /** column name */
   Role = 'role',
   /** column name */
   SchoolId = 'school_id',
   /** column name */
   State = 'state',
   /** column name */
   Street_1 = 'street_1',
   /** column name */
   Street_2 = 'street_2',
   /** column name */
   StudentId = 'student_id',
   /** column name */
   Suffix = 'suffix',
   /** column name */
   Title = 'title',
   /** column name */
   UpdatedAt = 'updated_at',
   /** column name */
   UserId = 'user_id',
   /** column name */
   Username = 'username',
   /** column name */
   WorkPhone = 'work_phone'
}

/** input type for updating data in table "users" */
export type Users_Set_Input = {
   birthdate?: Maybe<Scalars['date']>;
   city?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   created_at?: Maybe<Scalars['timestamptz']>;
   department?: Maybe<Scalars['String']>;
   education_level?: Maybe<Scalars['Int']>;
   email?: Maybe<Scalars['String']>;
   email_verified?: Maybe<Scalars['Boolean']>;
   first_name?: Maybe<Scalars['String']>;
   gender?: Maybe<Scalars['Int']>;
   home_phone?: Maybe<Scalars['String']>;
   id?: Maybe<Scalars['Int']>;
   image?: Maybe<Scalars['String']>;
   is_active?: Maybe<Scalars['Boolean']>;
   job_title?: Maybe<Scalars['String']>;
   last_name?: Maybe<Scalars['String']>;
   middle_name?: Maybe<Scalars['String']>;
   mobile_phone?: Maybe<Scalars['String']>;
   name?: Maybe<Scalars['String']>;
   other_name?: Maybe<Scalars['String']>;
   password?: Maybe<Scalars['String']>;
   postal_code?: Maybe<Scalars['String']>;
   role?: Maybe<Scalars['String']>;
   school_id?: Maybe<Scalars['Int']>;
   state?: Maybe<Scalars['String']>;
   street_1?: Maybe<Scalars['String']>;
   street_2?: Maybe<Scalars['String']>;
   student_id?: Maybe<Scalars['String']>;
   suffix?: Maybe<Scalars['String']>;
   title?: Maybe<Scalars['Int']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
   user_id?: Maybe<Scalars['String']>;
   username?: Maybe<Scalars['String']>;
   work_phone?: Maybe<Scalars['String']>;
};

/** aggregate stddev on columns */
export type Users_Stddev_Fields = {
   __typename?: 'users_stddev_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Users_Stddev_Pop_Fields = {
   __typename?: 'users_stddev_pop_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Users_Stddev_Samp_Fields = {
   __typename?: 'users_stddev_samp_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Users_Sum_Fields = {
   __typename?: 'users_sum_fields';
   education_level?: Maybe<Scalars['Int']>;
   gender?: Maybe<Scalars['Int']>;
   id?: Maybe<Scalars['Int']>;
   school_id?: Maybe<Scalars['Int']>;
   title?: Maybe<Scalars['Int']>;
};

/** update columns of table "users" */
export enum Users_Update_Column {
   /** column name */
   Birthdate = 'birthdate',
   /** column name */
   City = 'city',
   /** column name */
   Country = 'country',
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Department = 'department',
   /** column name */
   EducationLevel = 'education_level',
   /** column name */
   Email = 'email',
   /** column name */
   EmailVerified = 'email_verified',
   /** column name */
   FirstName = 'first_name',
   /** column name */
   Gender = 'gender',
   /** column name */
   HomePhone = 'home_phone',
   /** column name */
   Id = 'id',
   /** column name */
   Image = 'image',
   /** column name */
   IsActive = 'is_active',
   /** column name */
   JobTitle = 'job_title',
   /** column name */
   LastName = 'last_name',
   /** column name */
   MiddleName = 'middle_name',
   /** column name */
   MobilePhone = 'mobile_phone',
   /** column name */
   Name = 'name',
   /** column name */
   OtherName = 'other_name',
   /** column name */
   Password = 'password',
   /** column name */
   PostalCode = 'postal_code',
   /** column name */
   Role = 'role',
   /** column name */
   SchoolId = 'school_id',
   /** column name */
   State = 'state',
   /** column name */
   Street_1 = 'street_1',
   /** column name */
   Street_2 = 'street_2',
   /** column name */
   StudentId = 'student_id',
   /** column name */
   Suffix = 'suffix',
   /** column name */
   Title = 'title',
   /** column name */
   UpdatedAt = 'updated_at',
   /** column name */
   UserId = 'user_id',
   /** column name */
   Username = 'username',
   /** column name */
   WorkPhone = 'work_phone'
}

/** aggregate var_pop on columns */
export type Users_Var_Pop_Fields = {
   __typename?: 'users_var_pop_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Users_Var_Samp_Fields = {
   __typename?: 'users_var_samp_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Users_Variance_Fields = {
   __typename?: 'users_variance_fields';
   education_level?: Maybe<Scalars['Float']>;
   gender?: Maybe<Scalars['Float']>;
   id?: Maybe<Scalars['Float']>;
   school_id?: Maybe<Scalars['Float']>;
   title?: Maybe<Scalars['Float']>;
};

/** Boolean expression to compare columns of type "uuid". All fields are combined with logical 'AND'. */
export type Uuid_Comparison_Exp = {
   _eq?: Maybe<Scalars['uuid']>;
   _gt?: Maybe<Scalars['uuid']>;
   _gte?: Maybe<Scalars['uuid']>;
   _in?: Maybe<Array<Scalars['uuid']>>;
   _is_null?: Maybe<Scalars['Boolean']>;
   _lt?: Maybe<Scalars['uuid']>;
   _lte?: Maybe<Scalars['uuid']>;
   _neq?: Maybe<Scalars['uuid']>;
   _nin?: Maybe<Array<Scalars['uuid']>>;
};

/** columns and relationships of "verification_requests" */
export type Verification_Requests = {
   __typename?: 'verification_requests';
   created_at: Scalars['timestamptz'];
   expires: Scalars['timestamptz'];
   id: Scalars['Int'];
   identifier: Scalars['String'];
   token: Scalars['String'];
   updated_at: Scalars['timestamptz'];
};

/** aggregated selection of "verification_requests" */
export type Verification_Requests_Aggregate = {
   __typename?: 'verification_requests_aggregate';
   aggregate?: Maybe<Verification_Requests_Aggregate_Fields>;
   nodes: Array<Verification_Requests>;
};

/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_Fields = {
   __typename?: 'verification_requests_aggregate_fields';
   avg?: Maybe<Verification_Requests_Avg_Fields>;
   count: Scalars['Int'];
   max?: Maybe<Verification_Requests_Max_Fields>;
   min?: Maybe<Verification_Requests_Min_Fields>;
   stddev?: Maybe<Verification_Requests_Stddev_Fields>;
   stddev_pop?: Maybe<Verification_Requests_Stddev_Pop_Fields>;
   stddev_samp?: Maybe<Verification_Requests_Stddev_Samp_Fields>;
   sum?: Maybe<Verification_Requests_Sum_Fields>;
   var_pop?: Maybe<Verification_Requests_Var_Pop_Fields>;
   var_samp?: Maybe<Verification_Requests_Var_Samp_Fields>;
   variance?: Maybe<Verification_Requests_Variance_Fields>;
};


/** aggregate fields of "verification_requests" */
export type Verification_Requests_Aggregate_FieldsCountArgs = {
   columns?: Maybe<Array<Verification_Requests_Select_Column>>;
   distinct?: Maybe<Scalars['Boolean']>;
};

/** aggregate avg on columns */
export type Verification_Requests_Avg_Fields = {
   __typename?: 'verification_requests_avg_fields';
   id?: Maybe<Scalars['Float']>;
};

/** Boolean expression to filter rows from the table "verification_requests". All fields are combined with a logical 'AND'. */
export type Verification_Requests_Bool_Exp = {
   _and?: Maybe<Array<Verification_Requests_Bool_Exp>>;
   _not?: Maybe<Verification_Requests_Bool_Exp>;
   _or?: Maybe<Array<Verification_Requests_Bool_Exp>>;
   created_at?: Maybe<Timestamptz_Comparison_Exp>;
   expires?: Maybe<Timestamptz_Comparison_Exp>;
   id?: Maybe<Int_Comparison_Exp>;
   identifier?: Maybe<String_Comparison_Exp>;
   token?: Maybe<String_Comparison_Exp>;
   updated_at?: Maybe<Timestamptz_Comparison_Exp>;
};

/** unique or primary key constraints on table "verification_requests" */
export enum Verification_Requests_Constraint {
   /** unique or primary key constraint */
   Token = 'token',
   /** unique or primary key constraint */
   VerificationRequestsPkey = 'verification_requests_pkey'
}

/** input type for incrementing numeric columns in table "verification_requests" */
export type Verification_Requests_Inc_Input = {
   id?: Maybe<Scalars['Int']>;
};

/** input type for inserting data into table "verification_requests" */
export type Verification_Requests_Insert_Input = {
   created_at?: Maybe<Scalars['timestamptz']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   identifier?: Maybe<Scalars['String']>;
   token?: Maybe<Scalars['String']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate max on columns */
export type Verification_Requests_Max_Fields = {
   __typename?: 'verification_requests_max_fields';
   created_at?: Maybe<Scalars['timestamptz']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   identifier?: Maybe<Scalars['String']>;
   token?: Maybe<Scalars['String']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate min on columns */
export type Verification_Requests_Min_Fields = {
   __typename?: 'verification_requests_min_fields';
   created_at?: Maybe<Scalars['timestamptz']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   identifier?: Maybe<Scalars['String']>;
   token?: Maybe<Scalars['String']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
};

/** response of any mutation on the table "verification_requests" */
export type Verification_Requests_Mutation_Response = {
   __typename?: 'verification_requests_mutation_response';
   /** number of rows affected by the mutation */
   affected_rows: Scalars['Int'];
   /** data from the rows affected by the mutation */
   returning: Array<Verification_Requests>;
};

/** on conflict condition type for table "verification_requests" */
export type Verification_Requests_On_Conflict = {
   constraint: Verification_Requests_Constraint;
   update_columns?: Array<Verification_Requests_Update_Column>;
   where?: Maybe<Verification_Requests_Bool_Exp>;
};

/** Ordering options when selecting data from "verification_requests". */
export type Verification_Requests_Order_By = {
   created_at?: Maybe<Order_By>;
   expires?: Maybe<Order_By>;
   id?: Maybe<Order_By>;
   identifier?: Maybe<Order_By>;
   token?: Maybe<Order_By>;
   updated_at?: Maybe<Order_By>;
};

/** primary key columns input for table: verification_requests */
export type Verification_Requests_Pk_Columns_Input = {
   id: Scalars['Int'];
};

/** select columns of table "verification_requests" */
export enum Verification_Requests_Select_Column {
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Expires = 'expires',
   /** column name */
   Id = 'id',
   /** column name */
   Identifier = 'identifier',
   /** column name */
   Token = 'token',
   /** column name */
   UpdatedAt = 'updated_at'
}

/** input type for updating data in table "verification_requests" */
export type Verification_Requests_Set_Input = {
   created_at?: Maybe<Scalars['timestamptz']>;
   expires?: Maybe<Scalars['timestamptz']>;
   id?: Maybe<Scalars['Int']>;
   identifier?: Maybe<Scalars['String']>;
   token?: Maybe<Scalars['String']>;
   updated_at?: Maybe<Scalars['timestamptz']>;
};

/** aggregate stddev on columns */
export type Verification_Requests_Stddev_Fields = {
   __typename?: 'verification_requests_stddev_fields';
   id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_pop on columns */
export type Verification_Requests_Stddev_Pop_Fields = {
   __typename?: 'verification_requests_stddev_pop_fields';
   id?: Maybe<Scalars['Float']>;
};

/** aggregate stddev_samp on columns */
export type Verification_Requests_Stddev_Samp_Fields = {
   __typename?: 'verification_requests_stddev_samp_fields';
   id?: Maybe<Scalars['Float']>;
};

/** aggregate sum on columns */
export type Verification_Requests_Sum_Fields = {
   __typename?: 'verification_requests_sum_fields';
   id?: Maybe<Scalars['Int']>;
};

/** update columns of table "verification_requests" */
export enum Verification_Requests_Update_Column {
   /** column name */
   CreatedAt = 'created_at',
   /** column name */
   Expires = 'expires',
   /** column name */
   Id = 'id',
   /** column name */
   Identifier = 'identifier',
   /** column name */
   Token = 'token',
   /** column name */
   UpdatedAt = 'updated_at'
}

/** aggregate var_pop on columns */
export type Verification_Requests_Var_Pop_Fields = {
   __typename?: 'verification_requests_var_pop_fields';
   id?: Maybe<Scalars['Float']>;
};

/** aggregate var_samp on columns */
export type Verification_Requests_Var_Samp_Fields = {
   __typename?: 'verification_requests_var_samp_fields';
   id?: Maybe<Scalars['Float']>;
};

/** aggregate variance on columns */
export type Verification_Requests_Variance_Fields = {
   __typename?: 'verification_requests_variance_fields';
   id?: Maybe<Scalars['Float']>;
};

export type OtherUserFragment = { __typename?: 'users', id: number, title?: number | null | undefined, image?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, username?: string | null | undefined };

export type BaseUserFragment = {
   __typename?: 'users', id: number, title?: number | null | undefined, birthdate?: any | null | undefined, city?: string | null | undefined, country?: string | null | undefined, created_at: any, department?: string | null | undefined, education_level?: number | null | undefined, email: string, email_verified?: boolean | null | undefined, first_name?: string | null | undefined, gender?: number | null | undefined, home_phone?: string | null | undefined, image?: string | null | undefined, is_active: boolean, job_title?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, mobile_phone?: string | null | undefined, name?: string | null | undefined, other_name?: string | null | undefined, postal_code?: string | null | undefined, role?: string | null | undefined, school_id?: number | null | undefined, state?: string | null | undefined, street_1?: string | null | undefined, street_2?: string | null | undefined, student_id?: string | null | undefined, suffix?: string | null | undefined, updated_at: any, username?: string | null | undefined, work_phone?: string | null | undefined, school?: { __typename?: 'schools', id: number, is_active: boolean, name: string, short_name: string, type: number } | null | undefined
};

export type InsertContactFormMutationVariables = Exact<{
   comments?: Maybe<Scalars['String']>;
   country?: Maybe<Scalars['String']>;
   full_name?: Maybe<Scalars['String']>;
   email?: Maybe<Scalars['String']>;
   institution_name?: Maybe<Scalars['String']>;
   institution_type?: Maybe<Scalars['Int']>;
   job_title?: Maybe<Scalars['String']>;
   phone?: Maybe<Scalars['String']>;
   purchase_date?: Maybe<Scalars['Int']>;
   reason?: Maybe<Scalars['Int']>;
}>;


export type InsertContactFormMutation = { __typename?: 'mutation_root', insert_contacts_one?: { __typename?: 'contacts', reason: number, purchase_date: number, phone: string, job_title: string, institution_type: number, institution_name: string, id: number, full_name: string, email: string, country: string, comments?: string | null | undefined } | null | undefined };

export type UpdateCourseBannerColorMutationVariables = Exact<{
   id: Scalars['uuid'];
   banner_color: Scalars['String'];
}>;


export type UpdateCourseBannerColorMutation = { __typename?: 'mutation_root', update_courses?: { __typename?: 'courses_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'courses', banner_color?: string | null | undefined }> } | null | undefined };

export type UpdateCourseBackgroundColorMutationVariables = Exact<{
   id: Scalars['uuid'];
   background_color: Scalars['String'];
}>;


export type UpdateCourseBackgroundColorMutation = { __typename?: 'mutation_root', update_courses?: { __typename?: 'courses_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'courses', background_color?: string | null | undefined }> } | null | undefined };

export type UpdateCourseAvailabilityMutationVariables = Exact<{
   id: Scalars['uuid'];
   available: Scalars['Boolean'];
}>;


export type UpdateCourseAvailabilityMutation = { __typename?: 'mutation_root', update_courses?: { __typename?: 'courses_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'courses', available: boolean }> } | null | undefined };

export type UpdateCourseCodeMutationVariables = Exact<{
   id: Scalars['uuid'];
   code?: Maybe<Scalars['String']>;
}>;


export type UpdateCourseCodeMutation = { __typename?: 'mutation_root', update_courses?: { __typename?: 'courses_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'courses', access_code?: string | null | undefined }> } | null | undefined };

export type UpdateCourseDurationMutationVariables = Exact<{
   id: Scalars['uuid'];
   duration?: Maybe<Scalars['String']>;
}>;


export type UpdateCourseDurationMutation = { __typename?: 'mutation_root', update_courses?: { __typename?: 'courses_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'courses', duration?: string | null | undefined }> } | null | undefined };

export type GetCourseByIdQueryVariables = Exact<{
   id: Scalars['uuid'];
}>;


export type GetCourseByIdQuery = {
   __typename?: 'query_root', courses: Array<{
      __typename?: 'courses', access_code?: string | null | undefined, available: boolean, banner_color?: string | null | undefined, background_color?: string | null | undefined, banner_image?: string | null | undefined, description?: string | null | undefined, duration?: string | null | undefined, schedule?: string | null | undefined, id: any, instructor_id: number, level?: string | null | undefined, name: string, instructor?: { __typename?: 'users', id: number, title?: number | null | undefined, image?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, username?: string | null | undefined } | null | undefined, management: Array<{ __typename?: 'course_management', course_id: any, id: any, manager_id: any, manager?: { __typename?: 'users', id: number, title?: number | null | undefined, image?: string | null | undefined, first_name?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, username?: string | null | undefined } | null | undefined }>
   }>
};

export type GetCourseEnrollmentsQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCourseEnrollmentsQuery = { __typename?: 'query_root', course_enrollment: Array<{ __typename?: 'course_enrollment', course?: { __typename?: 'courses', name: string, access_code?: string | null | undefined, available: boolean, background_color?: string | null | undefined, banner_color?: string | null | undefined, banner_image?: string | null | undefined, description?: string | null | undefined, duration?: string | null | undefined, id: any, schedule?: string | null | undefined, instructor_id: number, level?: string | null | undefined, instructor?: { __typename?: 'users', first_name?: string | null | undefined, middle_name?: string | null | undefined, last_name?: string | null | undefined, image?: string | null | undefined } | null | undefined } | null | undefined }> };

export type GetOwnCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetOwnCoursesQuery = { __typename?: 'query_root', courses: Array<{ __typename?: 'courses', access_code?: string | null | undefined, available: boolean, background_color?: string | null | undefined, banner_color?: string | null | undefined, banner_image?: string | null | undefined, description?: string | null | undefined, duration?: string | null | undefined, id: any, level?: string | null | undefined, instructor_id: number, name: string, enrollments: Array<{ __typename?: 'course_enrollment', id: any, student?: { __typename?: 'users', first_name?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, image?: string | null | undefined } | null | undefined }> }> };

export type UpdateProspectiveUserEmailMutationVariables = Exact<{
   student_id: Scalars['String'];
   email: Scalars['String'];
   registration_step: Scalars['Int'];
}>;


export type UpdateProspectiveUserEmailMutation = { __typename?: 'mutation_root', update_prospective_users?: { __typename?: 'prospective_users_mutation_response', affected_rows: number } | null | undefined };

export type ActivateProspectiveUserMutationVariables = Exact<{
   student_id: Scalars['String'];
}>;


export type ActivateProspectiveUserMutation = { __typename?: 'mutation_root', update_prospective_users?: { __typename?: 'prospective_users_mutation_response', affected_rows: number } | null | undefined };

export type GetProspectiveUserByStudentIdAndCodeQueryVariables = Exact<{
   student_id: Scalars['String'];
   code: Scalars['String'];
}>;


export type GetProspectiveUserByStudentIdAndCodeQuery = { __typename?: 'query_root', prospective_users: Array<{ __typename?: 'prospective_users', id: number, registration_step: number, email?: string | null | undefined, code?: string | null | undefined, first_name: string, is_active: boolean, last_name: string, middle_name?: string | null | undefined, role?: string | null | undefined, school_id: number, student_id: string, username: string, school?: { __typename?: 'schools', short_name: string } | null | undefined }> };

export type GetProspectiveUserByStudentIdQueryVariables = Exact<{
   student_id: Scalars['String'];
}>;


export type GetProspectiveUserByStudentIdQuery = { __typename?: 'query_root', prospective_users: Array<{ __typename?: 'prospective_users', code?: string | null | undefined, email?: string | null | undefined, first_name: string, id: number, is_active: boolean, last_name: string, middle_name?: string | null | undefined, school_id: number, student_id: string, username: string, role?: string | null | undefined }> };

export type GetSchoolByShortNameQueryVariables = Exact<{
   short_name: Scalars['String'];
}>;


export type GetSchoolByShortNameQuery = { __typename?: 'query_root', schools: Array<{ __typename?: 'schools', id: number, is_active: boolean, name: string, short_name: string, type: number }> };

export type UpdateNewUserMutationVariables = Exact<{
   email: Scalars['String'];
   first_name: Scalars['String'];
   last_name: Scalars['String'];
   middle_name?: Maybe<Scalars['String']>;
   school_id: Scalars['Int'];
   username: Scalars['String'];
   student_id: Scalars['String'];
}>;


export type UpdateNewUserMutation = { __typename?: 'mutation_root', update_users?: { __typename?: 'users_mutation_response', affected_rows: number, returning: Array<{ __typename?: 'users', first_name?: string | null | undefined, middle_name?: string | null | undefined, last_name?: string | null | undefined, student_id?: string | null | undefined, username?: string | null | undefined, school_id?: number | null | undefined, email: string, name?: string | null | undefined, image?: string | null | undefined, id: number, role?: string | null | undefined }> } | null | undefined };

export type GetUserByEmailQueryVariables = Exact<{
   email: Scalars['String'];
}>;


export type GetUserByEmailQuery = {
   __typename?: 'query_root', users: Array<{
      __typename?: 'users', id: number, title?: number | null | undefined, birthdate?: any | null | undefined, city?: string | null | undefined, country?: string | null | undefined, created_at: any, department?: string | null | undefined, education_level?: number | null | undefined, email: string, email_verified?: boolean | null | undefined, first_name?: string | null | undefined, gender?: number | null | undefined, home_phone?: string | null | undefined, image?: string | null | undefined, is_active: boolean, job_title?: string | null | undefined, last_name?: string | null | undefined, middle_name?: string | null | undefined, mobile_phone?: string | null | undefined, name?: string | null | undefined, other_name?: string | null | undefined, postal_code?: string | null | undefined, role?: string | null | undefined, school_id?: number | null | undefined, state?: string | null | undefined, street_1?: string | null | undefined, street_2?: string | null | undefined, student_id?: string | null | undefined, suffix?: string | null | undefined, updated_at: any, username?: string | null | undefined, work_phone?: string | null | undefined, school?: { __typename?: 'schools', id: number, is_active: boolean, name: string, short_name: string, type: number } | null | undefined
   }>
};

export const OtherUserFragmentDoc = gql`
    fragment otherUser on users {
        id
        title
        image
        first_name
        last_name
        middle_name
        username
    }
`
export const BaseUserFragmentDoc = gql`
    fragment baseUser on users {
        id
        title
        birthdate
        city
        country
        created_at
        department
        education_level
        email
        email_verified
        first_name
        gender
        home_phone
        image
        is_active
        job_title
        last_name
        middle_name
        mobile_phone
        name
        other_name
        postal_code
        role
        school_id
        state
        street_1
        street_2
        student_id
        suffix
        updated_at
        username
        work_phone
        school {
            id
            is_active
            name
            short_name
            type
        }
    }
`
export const InsertContactFormDocument = gql`
    mutation InsertContactForm($comments: String = "", $country: String = "", $full_name: String = "", $email: String = "", $institution_name: String = "", $institution_type: Int = 10, $job_title: String = "", $phone: String = "", $purchase_date: Int = 10, $reason: Int = 10) {
        insert_contacts_one(
            object: {comments: $comments, country: $country, email: $email, full_name: $full_name, institution_name: $institution_name, institution_type: $institution_type, phone: $phone, job_title: $job_title, purchase_date: $purchase_date, reason: $reason}
        ) {
            reason
            purchase_date
            phone
            job_title
            institution_type
            institution_name
            id
            full_name
            email
            country
            comments
        }
    }
`
export type InsertContactFormMutationFn = Apollo.MutationFunction<InsertContactFormMutation, InsertContactFormMutationVariables>;

/**
 * __useInsertContactFormMutation__
 *
 * To run a mutation, you first call `useInsertContactFormMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useInsertContactFormMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [insertContactFormMutation, { data, loading, error }] = useInsertContactFormMutation({
 *   variables: {
 *      comments: // value for 'comments'
 *      country: // value for 'country'
 *      full_name: // value for 'full_name'
 *      email: // value for 'email'
 *      institution_name: // value for 'institution_name'
 *      institution_type: // value for 'institution_type'
 *      job_title: // value for 'job_title'
 *      phone: // value for 'phone'
 *      purchase_date: // value for 'purchase_date'
 *      reason: // value for 'reason'
 *   },
 * });
 */
export function useInsertContactFormMutation(baseOptions?: Apollo.MutationHookOptions<InsertContactFormMutation, InsertContactFormMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<InsertContactFormMutation, InsertContactFormMutationVariables>(InsertContactFormDocument, options)
}

export type InsertContactFormMutationHookResult = ReturnType<typeof useInsertContactFormMutation>;
export type InsertContactFormMutationResult = Apollo.MutationResult<InsertContactFormMutation>;
export type InsertContactFormMutationOptions = Apollo.BaseMutationOptions<InsertContactFormMutation, InsertContactFormMutationVariables>;
export const UpdateCourseBannerColorDocument = gql`
    mutation UpdateCourseBannerColor($id: uuid!, $banner_color: String!) {
        update_courses(where: {id: {_eq: $id}}, _set: {banner_color: $banner_color}) {
            affected_rows
            returning {
                banner_color
            }
        }
    }
`
export type UpdateCourseBannerColorMutationFn = Apollo.MutationFunction<UpdateCourseBannerColorMutation, UpdateCourseBannerColorMutationVariables>;

/**
 * __useUpdateCourseBannerColorMutation__
 *
 * To run a mutation, you first call `useUpdateCourseBannerColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseBannerColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseBannerColorMutation, { data, loading, error }] = useUpdateCourseBannerColorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      banner_color: // value for 'banner_color'
 *   },
 * });
 */
export function useUpdateCourseBannerColorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseBannerColorMutation, UpdateCourseBannerColorMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateCourseBannerColorMutation, UpdateCourseBannerColorMutationVariables>(UpdateCourseBannerColorDocument, options)
}

export type UpdateCourseBannerColorMutationHookResult = ReturnType<typeof useUpdateCourseBannerColorMutation>;
export type UpdateCourseBannerColorMutationResult = Apollo.MutationResult<UpdateCourseBannerColorMutation>;
export type UpdateCourseBannerColorMutationOptions = Apollo.BaseMutationOptions<UpdateCourseBannerColorMutation, UpdateCourseBannerColorMutationVariables>;
export const UpdateCourseBackgroundColorDocument = gql`
    mutation UpdateCourseBackgroundColor($id: uuid!, $background_color: String!) {
        update_courses(
            where: {id: {_eq: $id}}
            _set: {background_color: $background_color}
        ) {
            affected_rows
            returning {
                background_color
            }
        }
    }
`
export type UpdateCourseBackgroundColorMutationFn = Apollo.MutationFunction<UpdateCourseBackgroundColorMutation, UpdateCourseBackgroundColorMutationVariables>;

/**
 * __useUpdateCourseBackgroundColorMutation__
 *
 * To run a mutation, you first call `useUpdateCourseBackgroundColorMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseBackgroundColorMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseBackgroundColorMutation, { data, loading, error }] = useUpdateCourseBackgroundColorMutation({
 *   variables: {
 *      id: // value for 'id'
 *      background_color: // value for 'background_color'
 *   },
 * });
 */
export function useUpdateCourseBackgroundColorMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseBackgroundColorMutation, UpdateCourseBackgroundColorMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateCourseBackgroundColorMutation, UpdateCourseBackgroundColorMutationVariables>(UpdateCourseBackgroundColorDocument, options)
}

export type UpdateCourseBackgroundColorMutationHookResult = ReturnType<typeof useUpdateCourseBackgroundColorMutation>;
export type UpdateCourseBackgroundColorMutationResult = Apollo.MutationResult<UpdateCourseBackgroundColorMutation>;
export type UpdateCourseBackgroundColorMutationOptions = Apollo.BaseMutationOptions<UpdateCourseBackgroundColorMutation, UpdateCourseBackgroundColorMutationVariables>;
export const UpdateCourseAvailabilityDocument = gql`
    mutation UpdateCourseAvailability($id: uuid!, $available: Boolean!) {
        update_courses(where: {id: {_eq: $id}}, _set: {available: $available}) {
            affected_rows
            returning {
                available
            }
        }
    }
`
export type UpdateCourseAvailabilityMutationFn = Apollo.MutationFunction<UpdateCourseAvailabilityMutation, UpdateCourseAvailabilityMutationVariables>;

/**
 * __useUpdateCourseAvailabilityMutation__
 *
 * To run a mutation, you first call `useUpdateCourseAvailabilityMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseAvailabilityMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseAvailabilityMutation, { data, loading, error }] = useUpdateCourseAvailabilityMutation({
 *   variables: {
 *      id: // value for 'id'
 *      available: // value for 'available'
 *   },
 * });
 */
export function useUpdateCourseAvailabilityMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseAvailabilityMutation, UpdateCourseAvailabilityMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateCourseAvailabilityMutation, UpdateCourseAvailabilityMutationVariables>(UpdateCourseAvailabilityDocument, options)
}

export type UpdateCourseAvailabilityMutationHookResult = ReturnType<typeof useUpdateCourseAvailabilityMutation>;
export type UpdateCourseAvailabilityMutationResult = Apollo.MutationResult<UpdateCourseAvailabilityMutation>;
export type UpdateCourseAvailabilityMutationOptions = Apollo.BaseMutationOptions<UpdateCourseAvailabilityMutation, UpdateCourseAvailabilityMutationVariables>;
export const UpdateCourseCodeDocument = gql`
    mutation UpdateCourseCode($id: uuid!, $code: String) {
        update_courses(where: {id: {_eq: $id}}, _set: {access_code: $code}) {
            affected_rows
            returning {
                access_code
            }
        }
    }
`
export type UpdateCourseCodeMutationFn = Apollo.MutationFunction<UpdateCourseCodeMutation, UpdateCourseCodeMutationVariables>;

/**
 * __useUpdateCourseCodeMutation__
 *
 * To run a mutation, you first call `useUpdateCourseCodeMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseCodeMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseCodeMutation, { data, loading, error }] = useUpdateCourseCodeMutation({
 *   variables: {
 *      id: // value for 'id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useUpdateCourseCodeMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseCodeMutation, UpdateCourseCodeMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateCourseCodeMutation, UpdateCourseCodeMutationVariables>(UpdateCourseCodeDocument, options)
}

export type UpdateCourseCodeMutationHookResult = ReturnType<typeof useUpdateCourseCodeMutation>;
export type UpdateCourseCodeMutationResult = Apollo.MutationResult<UpdateCourseCodeMutation>;
export type UpdateCourseCodeMutationOptions = Apollo.BaseMutationOptions<UpdateCourseCodeMutation, UpdateCourseCodeMutationVariables>;
export const UpdateCourseDurationDocument = gql`
    mutation UpdateCourseDuration($id: uuid!, $duration: String) {
        update_courses(where: {id: {_eq: $id}}, _set: {duration: $duration}) {
            affected_rows
            returning {
                duration
            }
        }
    }
`
export type UpdateCourseDurationMutationFn = Apollo.MutationFunction<UpdateCourseDurationMutation, UpdateCourseDurationMutationVariables>;

/**
 * __useUpdateCourseDurationMutation__
 *
 * To run a mutation, you first call `useUpdateCourseDurationMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCourseDurationMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCourseDurationMutation, { data, loading, error }] = useUpdateCourseDurationMutation({
 *   variables: {
 *      id: // value for 'id'
 *      duration: // value for 'duration'
 *   },
 * });
 */
export function useUpdateCourseDurationMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCourseDurationMutation, UpdateCourseDurationMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateCourseDurationMutation, UpdateCourseDurationMutationVariables>(UpdateCourseDurationDocument, options)
}

export type UpdateCourseDurationMutationHookResult = ReturnType<typeof useUpdateCourseDurationMutation>;
export type UpdateCourseDurationMutationResult = Apollo.MutationResult<UpdateCourseDurationMutation>;
export type UpdateCourseDurationMutationOptions = Apollo.BaseMutationOptions<UpdateCourseDurationMutation, UpdateCourseDurationMutationVariables>;
export const GetCourseByIdDocument = gql`
    query GetCourseById($id: uuid!) {
        courses(limit: 1, where: {id: {_eq: $id}}) {
            access_code
            available
            banner_color
            background_color
            banner_image
            description
            duration
            schedule
            id
            instructor {
                ...otherUser
            }
            instructor_id
            level
            name
            management {
                course_id
                id
                manager_id
                manager {
                    ...otherUser
                }
            }
        }
    }
${OtherUserFragmentDoc}`

/**
 * __useGetCourseByIdQuery__
 *
 * To run a query within a React component, call `useGetCourseByIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseByIdQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseByIdQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useGetCourseByIdQuery(baseOptions: Apollo.QueryHookOptions<GetCourseByIdQuery, GetCourseByIdQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetCourseByIdQuery, GetCourseByIdQueryVariables>(GetCourseByIdDocument, options)
}

export function useGetCourseByIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseByIdQuery, GetCourseByIdQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetCourseByIdQuery, GetCourseByIdQueryVariables>(GetCourseByIdDocument, options)
}

export type GetCourseByIdQueryHookResult = ReturnType<typeof useGetCourseByIdQuery>;
export type GetCourseByIdLazyQueryHookResult = ReturnType<typeof useGetCourseByIdLazyQuery>;
export type GetCourseByIdQueryResult = Apollo.QueryResult<GetCourseByIdQuery, GetCourseByIdQueryVariables>;
export const GetCourseEnrollmentsDocument = gql`
    query GetCourseEnrollments {
        course_enrollment {
            course {
                name
                access_code
                available
                background_color
                banner_color
                banner_image
                description
                duration
                id
                schedule
                instructor_id
                level
                instructor {
                    first_name
                    middle_name
                    last_name
                    image
                }
            }
        }
    }
`

/**
 * __useGetCourseEnrollmentsQuery__
 *
 * To run a query within a React component, call `useGetCourseEnrollmentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCourseEnrollmentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCourseEnrollmentsQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCourseEnrollmentsQuery(baseOptions?: Apollo.QueryHookOptions<GetCourseEnrollmentsQuery, GetCourseEnrollmentsQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetCourseEnrollmentsQuery, GetCourseEnrollmentsQueryVariables>(GetCourseEnrollmentsDocument, options)
}

export function useGetCourseEnrollmentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCourseEnrollmentsQuery, GetCourseEnrollmentsQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetCourseEnrollmentsQuery, GetCourseEnrollmentsQueryVariables>(GetCourseEnrollmentsDocument, options)
}

export type GetCourseEnrollmentsQueryHookResult = ReturnType<typeof useGetCourseEnrollmentsQuery>;
export type GetCourseEnrollmentsLazyQueryHookResult = ReturnType<typeof useGetCourseEnrollmentsLazyQuery>;
export type GetCourseEnrollmentsQueryResult = Apollo.QueryResult<GetCourseEnrollmentsQuery, GetCourseEnrollmentsQueryVariables>;
export const GetOwnCoursesDocument = gql`
    query GetOwnCourses {
        courses {
            access_code
            available
            background_color
            banner_color
            banner_image
            description
            duration
            id
            level
            instructor_id
            name
            enrollments {
                id
                student {
                    first_name
                    last_name
                    middle_name
                    image
                }
            }
        }
    }
`

/**
 * __useGetOwnCoursesQuery__
 *
 * To run a query within a React component, call `useGetOwnCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetOwnCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetOwnCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetOwnCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetOwnCoursesQuery, GetOwnCoursesQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetOwnCoursesQuery, GetOwnCoursesQueryVariables>(GetOwnCoursesDocument, options)
}

export function useGetOwnCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetOwnCoursesQuery, GetOwnCoursesQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetOwnCoursesQuery, GetOwnCoursesQueryVariables>(GetOwnCoursesDocument, options)
}

export type GetOwnCoursesQueryHookResult = ReturnType<typeof useGetOwnCoursesQuery>;
export type GetOwnCoursesLazyQueryHookResult = ReturnType<typeof useGetOwnCoursesLazyQuery>;
export type GetOwnCoursesQueryResult = Apollo.QueryResult<GetOwnCoursesQuery, GetOwnCoursesQueryVariables>;
export const UpdateProspectiveUserEmailDocument = gql`
    mutation UpdateProspectiveUserEmail($student_id: String!, $email: String!, $registration_step: Int!) {
        update_prospective_users(
            where: {student_id: {_eq: $student_id}}
            _set: {email: $email, registration_step: $registration_step}
        ) {
            affected_rows
        }
    }
`
export type UpdateProspectiveUserEmailMutationFn = Apollo.MutationFunction<UpdateProspectiveUserEmailMutation, UpdateProspectiveUserEmailMutationVariables>;

/**
 * __useUpdateProspectiveUserEmailMutation__
 *
 * To run a mutation, you first call `useUpdateProspectiveUserEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateProspectiveUserEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateProspectiveUserEmailMutation, { data, loading, error }] = useUpdateProspectiveUserEmailMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      email: // value for 'email'
 *      registration_step: // value for 'registration_step'
 *   },
 * });
 */
export function useUpdateProspectiveUserEmailMutation(baseOptions?: Apollo.MutationHookOptions<UpdateProspectiveUserEmailMutation, UpdateProspectiveUserEmailMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateProspectiveUserEmailMutation, UpdateProspectiveUserEmailMutationVariables>(UpdateProspectiveUserEmailDocument, options)
}

export type UpdateProspectiveUserEmailMutationHookResult = ReturnType<typeof useUpdateProspectiveUserEmailMutation>;
export type UpdateProspectiveUserEmailMutationResult = Apollo.MutationResult<UpdateProspectiveUserEmailMutation>;
export type UpdateProspectiveUserEmailMutationOptions = Apollo.BaseMutationOptions<UpdateProspectiveUserEmailMutation, UpdateProspectiveUserEmailMutationVariables>;
export const ActivateProspectiveUserDocument = gql`
    mutation ActivateProspectiveUser($student_id: String!) {
        update_prospective_users(
            where: {student_id: {_eq: $student_id}}
            _set: {is_active: true}
        ) {
            affected_rows
        }
    }
`
export type ActivateProspectiveUserMutationFn = Apollo.MutationFunction<ActivateProspectiveUserMutation, ActivateProspectiveUserMutationVariables>;

/**
 * __useActivateProspectiveUserMutation__
 *
 * To run a mutation, you first call `useActivateProspectiveUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useActivateProspectiveUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [activateProspectiveUserMutation, { data, loading, error }] = useActivateProspectiveUserMutation({
 *   variables: {
 *      student_id: // value for 'student_id'
 *   },
 * });
 */
export function useActivateProspectiveUserMutation(baseOptions?: Apollo.MutationHookOptions<ActivateProspectiveUserMutation, ActivateProspectiveUserMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<ActivateProspectiveUserMutation, ActivateProspectiveUserMutationVariables>(ActivateProspectiveUserDocument, options)
}

export type ActivateProspectiveUserMutationHookResult = ReturnType<typeof useActivateProspectiveUserMutation>;
export type ActivateProspectiveUserMutationResult = Apollo.MutationResult<ActivateProspectiveUserMutation>;
export type ActivateProspectiveUserMutationOptions = Apollo.BaseMutationOptions<ActivateProspectiveUserMutation, ActivateProspectiveUserMutationVariables>;
export const GetProspectiveUserByStudentIdAndCodeDocument = gql`
    query GetProspectiveUserByStudentIdAndCode($student_id: String!, $code: String!) {
        prospective_users(
            where: {_and: {student_id: {_eq: $student_id}, code: {_eq: $code}}}
        ) {
            id
            registration_step
            email
            code
            first_name
            is_active
            last_name
            middle_name
            role
            school_id
            student_id
            username
            school {
                short_name
            }
        }
    }
`

/**
 * __useGetProspectiveUserByStudentIdAndCodeQuery__
 *
 * To run a query within a React component, call `useGetProspectiveUserByStudentIdAndCodeQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProspectiveUserByStudentIdAndCodeQuery` returns an object from Apollo Client that contains loading, error, and
 * data properties you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProspectiveUserByStudentIdAndCodeQuery({
 *   variables: {
 *      student_id: // value for 'student_id'
 *      code: // value for 'code'
 *   },
 * });
 */
export function useGetProspectiveUserByStudentIdAndCodeQuery(baseOptions: Apollo.QueryHookOptions<GetProspectiveUserByStudentIdAndCodeQuery, GetProspectiveUserByStudentIdAndCodeQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetProspectiveUserByStudentIdAndCodeQuery, GetProspectiveUserByStudentIdAndCodeQueryVariables>(GetProspectiveUserByStudentIdAndCodeDocument, options)
}

export function useGetProspectiveUserByStudentIdAndCodeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProspectiveUserByStudentIdAndCodeQuery, GetProspectiveUserByStudentIdAndCodeQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetProspectiveUserByStudentIdAndCodeQuery, GetProspectiveUserByStudentIdAndCodeQueryVariables>(GetProspectiveUserByStudentIdAndCodeDocument, options)
}

export type GetProspectiveUserByStudentIdAndCodeQueryHookResult = ReturnType<typeof useGetProspectiveUserByStudentIdAndCodeQuery>;
export type GetProspectiveUserByStudentIdAndCodeLazyQueryHookResult = ReturnType<typeof useGetProspectiveUserByStudentIdAndCodeLazyQuery>;
export type GetProspectiveUserByStudentIdAndCodeQueryResult = Apollo.QueryResult<GetProspectiveUserByStudentIdAndCodeQuery, GetProspectiveUserByStudentIdAndCodeQueryVariables>;
export const GetProspectiveUserByStudentIdDocument = gql`
    query GetProspectiveUserByStudentId($student_id: String!) {
        prospective_users(limit: 1, where: {student_id: {_eq: $student_id}}) {
            code
            email
            first_name
            id
            is_active
            last_name
            middle_name
            school_id
            student_id
            username
            role
        }
    }
`

/**
 * __useGetProspectiveUserByStudentIdQuery__
 *
 * To run a query within a React component, call `useGetProspectiveUserByStudentIdQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProspectiveUserByStudentIdQuery` returns an object from Apollo Client that contains loading, error, and data
 * properties you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProspectiveUserByStudentIdQuery({
 *   variables: {
 *      student_id: // value for 'student_id'
 *   },
 * });
 */
export function useGetProspectiveUserByStudentIdQuery(baseOptions: Apollo.QueryHookOptions<GetProspectiveUserByStudentIdQuery, GetProspectiveUserByStudentIdQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetProspectiveUserByStudentIdQuery, GetProspectiveUserByStudentIdQueryVariables>(GetProspectiveUserByStudentIdDocument, options)
}

export function useGetProspectiveUserByStudentIdLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProspectiveUserByStudentIdQuery, GetProspectiveUserByStudentIdQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetProspectiveUserByStudentIdQuery, GetProspectiveUserByStudentIdQueryVariables>(GetProspectiveUserByStudentIdDocument, options)
}

export type GetProspectiveUserByStudentIdQueryHookResult = ReturnType<typeof useGetProspectiveUserByStudentIdQuery>;
export type GetProspectiveUserByStudentIdLazyQueryHookResult = ReturnType<typeof useGetProspectiveUserByStudentIdLazyQuery>;
export type GetProspectiveUserByStudentIdQueryResult = Apollo.QueryResult<GetProspectiveUserByStudentIdQuery, GetProspectiveUserByStudentIdQueryVariables>;
export const GetSchoolByShortNameDocument = gql`
    query GetSchoolByShortName($short_name: String!) {
        schools(limit: 1, where: {short_name: {_eq: $short_name}}) {
            id
            is_active
            name
            short_name
            type
        }
    }
`

/**
 * __useGetSchoolByShortNameQuery__
 *
 * To run a query within a React component, call `useGetSchoolByShortNameQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetSchoolByShortNameQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetSchoolByShortNameQuery({
 *   variables: {
 *      short_name: // value for 'short_name'
 *   },
 * });
 */
export function useGetSchoolByShortNameQuery(baseOptions: Apollo.QueryHookOptions<GetSchoolByShortNameQuery, GetSchoolByShortNameQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetSchoolByShortNameQuery, GetSchoolByShortNameQueryVariables>(GetSchoolByShortNameDocument, options)
}

export function useGetSchoolByShortNameLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetSchoolByShortNameQuery, GetSchoolByShortNameQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetSchoolByShortNameQuery, GetSchoolByShortNameQueryVariables>(GetSchoolByShortNameDocument, options)
}

export type GetSchoolByShortNameQueryHookResult = ReturnType<typeof useGetSchoolByShortNameQuery>;
export type GetSchoolByShortNameLazyQueryHookResult = ReturnType<typeof useGetSchoolByShortNameLazyQuery>;
export type GetSchoolByShortNameQueryResult = Apollo.QueryResult<GetSchoolByShortNameQuery, GetSchoolByShortNameQueryVariables>;
export const UpdateNewUserDocument = gql`
    mutation UpdateNewUser($email: String!, $first_name: String!, $last_name: String!, $middle_name: String, $school_id: Int!, $username: String!, $student_id: String!) {
        update_users(
            where: {email: {_eq: $email}}
            _set: {first_name: $first_name, last_name: $last_name, middle_name: $middle_name, school_id: $school_id, username: $username, student_id: $student_id, is_active: true}
        ) {
            affected_rows
            returning {
                first_name
                middle_name
                last_name
                student_id
                username
                school_id
                email
                name
                image
                id
                role
            }
        }
    }
`
export type UpdateNewUserMutationFn = Apollo.MutationFunction<UpdateNewUserMutation, UpdateNewUserMutationVariables>;

/**
 * __useUpdateNewUserMutation__
 *
 * To run a mutation, you first call `useUpdateNewUserMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateNewUserMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateNewUserMutation, { data, loading, error }] = useUpdateNewUserMutation({
 *   variables: {
 *      email: // value for 'email'
 *      first_name: // value for 'first_name'
 *      last_name: // value for 'last_name'
 *      middle_name: // value for 'middle_name'
 *      school_id: // value for 'school_id'
 *      username: // value for 'username'
 *      student_id: // value for 'student_id'
 *   },
 * });
 */
export function useUpdateNewUserMutation(baseOptions?: Apollo.MutationHookOptions<UpdateNewUserMutation, UpdateNewUserMutationVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useMutation<UpdateNewUserMutation, UpdateNewUserMutationVariables>(UpdateNewUserDocument, options)
}

export type UpdateNewUserMutationHookResult = ReturnType<typeof useUpdateNewUserMutation>;
export type UpdateNewUserMutationResult = Apollo.MutationResult<UpdateNewUserMutation>;
export type UpdateNewUserMutationOptions = Apollo.BaseMutationOptions<UpdateNewUserMutation, UpdateNewUserMutationVariables>;
export const GetUserByEmailDocument = gql`
    query GetUserByEmail($email: String!) {
        users(where: {email: {_eq: $email}}, limit: 1) {
            ...baseUser
        }
    }
${BaseUserFragmentDoc}`

/**
 * __useGetUserByEmailQuery__
 *
 * To run a query within a React component, call `useGetUserByEmailQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserByEmailQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on:
 *    https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserByEmailQuery({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useGetUserByEmailQuery(baseOptions: Apollo.QueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options)
}

export function useGetUserByEmailLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserByEmailQuery, GetUserByEmailQueryVariables>) {
   const options = { ...defaultOptions, ...baseOptions }
   return Apollo.useLazyQuery<GetUserByEmailQuery, GetUserByEmailQueryVariables>(GetUserByEmailDocument, options)
}

export type GetUserByEmailQueryHookResult = ReturnType<typeof useGetUserByEmailQuery>;
export type GetUserByEmailLazyQueryHookResult = ReturnType<typeof useGetUserByEmailLazyQuery>;
export type GetUserByEmailQueryResult = Apollo.QueryResult<GetUserByEmailQuery, GetUserByEmailQueryVariables>;
