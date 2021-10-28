import { gql } from '@apollo/client'

export const SUBMIT_CONTACT_FORM = gql`
mutation MyMutation($comments: String = "", $country: String = "", $full_name: String = "", $email: String = "", $institution_name: String = "", $institution_type: Int = 10, $job_title: String = "", $phone: String = "", $purchase_date: Int = 10, $reason: Int = 10) {
  insert_contacts_one(object: {comments: $comments, country: $country, email: $email, full_name: $full_name, institution_name: $institution_name, institution_type: $institution_type, phone: $phone, job_title: $job_title, purchase_date: $purchase_date, reason: $reason}) {
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
