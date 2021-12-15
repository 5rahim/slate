import { DefaultHead } from '@slate/components/Layout/DefaultHead'
import SchoolRegistrationLayout from '@slate/components/Layout/SchoolRegistrationLayout'
import { withApollo } from '@slate/graphql/apollo/withApollo'
import { Alert, AlertDescription, AlertIcon, AlertTitle } from 'chalkui/dist/cjs/Components/Alert/Alert'
import { Button } from 'chalkui/dist/cjs/Components/Button/Button'
import { FormControl } from 'chalkui/dist/cjs/Components/FormControl/FormControl'
import { FormLabel } from 'chalkui/dist/cjs/Components/FormControl/FormLabel'
import { Input } from 'chalkui/dist/cjs/Components/Input/Input'
import { Box, Flex } from 'chalkui/dist/cjs/Components/Layout'
import { Select } from 'chalkui/dist/cjs/Components/Select/Select'
import { Textarea } from 'chalkui/dist/cjs/Components/Textarea/Textarea'
import { useToast } from 'chalkui/dist/cjs/Components/Toast/UseToast'
import { Heading } from 'chalkui/dist/cjs/Components/Typography/Heading'
// import { SUBMIT_CONTACT_FORM } from '@slate/graphql/models/contact/mutations'
import { motion } from 'framer-motion'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Trans, useTranslation } from 'react-i18next'


const ContactUs: NextPage = () => {
   const toast = useToast()
   
   const { t } = useTranslation(['common', 'contact'], { useSuspense: false })
   
   const { register, handleSubmit, control, watch, reset, formState: { errors } } = useForm()
   
   const [isActive, setActive] = useState<boolean>(true)
   const router = useRouter()
   const [isLoading, setIsLoading] = useState(false)
   const [formSubmitted, setFormSubmitted] = useState(false)
   
   // const [submitContactForm] = useMutation(SUBMIT_CONTACT_FORM, {
   //    onCompleted: () => {
   //       reset()
   //       // props.onClose()
   //       // router.push('/institution_registration')
   //       setIsLoading(false)
   //       setFormSubmitted(true)
   //
   //    },
   // })
   
   const onSubmit = (data: any) => {
      setIsLoading(true)
      
      // submitContactForm({
      //    variables: { ...data },
      // })
   }
   
   
   return (
      
      <>
         
         <DefaultHead pageTitle={t('Contact us')} />
         
         <SchoolRegistrationLayout width="full" mx="auto" zIndex={1}>
            
            
            <motion.span
               style={{ zIndex: 1 }}
               initial={{
                  opacity: 0,
                  y: 60,
               }}
               animate={{
                  opacity: 1, y: 0,
               }}
               transition={{ delay: .5, ease: "easeInOut", duration: 0.5 }}
            >
               
               <Box>
                  
                  <Flex
                     height={["300px", "300px", "300px", "200px"]}
                     backgroundColor={"brand.200"}
                     backgroundImage={'url(assets/patterns/topography.png)'}
                     backgroundBlendMode={"color-burn"}
                     color="white"
                     mb={10}
                  >
                     
                     <Box width={['90%', '90%', '90%', '80%']} margin="auto">
                        
                        <Box mb={7} display={['block', null, null, 'none']}>
                           <Button size="sm" as={'a'} href={'/'}>{t('Go to the home page')}</Button>
                        </Box>
                        
                        <Box mb={3}>
                           <Heading size="2xl">{t('Contact us')}</Heading>
                        </Box>
                        <Box mb={3}>{t('contact:description')}</Box>
                     </Box>
                  
                  </Flex>
                  
                  
                  {formSubmitted ?
                     
                     <Box maxWidth="90%" mb={5} margin="0 auto">
                        
                        <Alert color="brand.200" variant="secondary" status={"success"} isLarge mb={5}>
                           <AlertIcon />
                           <AlertTitle mt={4} mb={1} fontSize="lg">
                              {t('contact:submitted.thank you')}
                           </AlertTitle>
                           <AlertDescription maxWidth="sm">
                              {t('contact:submitted.was submitted')}
                           </AlertDescription>
                           {/*<AlertCloseButton />*/}
                        </Alert>
                        
                        <Button colorScheme="brand.100" width="100%" as="a" href="/">{t('Go to the home page')}</Button>
                     
                     </Box> :
                     
                     
                     <Box maxWidth={['90%', null, null, '40rem']} margin="auto" mb={10}>
                        
                        <form onSubmit={handleSubmit(onSubmit)}>
                           
                           
                           <FormControl mb={3} id="full_name" isRequired={true}>
                              <FormLabel>{t('form:Full name')}</FormLabel>
                              <Input {...register("full_name", { required: true })} placeholder={t('form:Full name')} />
                           </FormControl>
                           
                           <FormControl mb={3} id="email" isRequired={true}>
                              <FormLabel>{t('form:Email address')}</FormLabel>
                              <Input {...register("email", { required: true })} type="email" placeholder={t('form:Email address')} />
                           </FormControl>
                           
                           <FormControl mb={3} id="job_title" isRequired={true}>
                              <FormLabel>{t('form:Job Title')}</FormLabel>
                              <Input {...register("job_title", { required: true })} placeholder={t('form:Job Title')} />
                           </FormControl>
                           
                           
                           <FormControl mb={3} id="phone" isRequired={true}>
                              <FormLabel>{t('form:Business Phone')}</FormLabel>
                              <Input {...register("phone", { required: true })} placeholder={t('form:Business Phone')} />
                           </FormControl>
                           
                           <FormControl mb={3} id="institution_name" isRequired={true}>
                              <FormLabel>{t('form:Institution name')}</FormLabel>
                              <Input {...register("institution_name", { required: true })} placeholder={t('form:Institution name')} />
                           </FormControl>
                           
                           <FormControl mb={3} id="country" isRequired={true}>
                              <FormLabel>{t('form:What country')}</FormLabel>
                              <Select {...register("country", { required: true })} defaultValue="CI">
                                 <option value="CM">{t('country.Cameroon')}</option>
                                 <option value="CI">{t('country.Côte d\'Ivoire')}</option>
                                 <option value="EG">{t('country.Egypt')}</option>
                                 <option value="ET">{t('country.Ethiopia')}</option>
                                 <option value="GB">{t('country.Gabon')}</option>
                                 <option value="GH">{t('country.Ghana')}</option>
                                 <option value="KE">{t('country.Kenya')}</option>
                                 <option value="MW">{t('country.Malawi')}</option>
                                 <option value="MU">{t('country.Mauritius')}</option>
                                 <option value="MA">{t('country.Morocco')}</option>
                                 <option value="MZ">{t('country.Mozambique')}</option>
                                 <option value="NG">{t('country.Nigeria')}</option>
                                 <option value="RW">{t('country.Rwanda')}</option>
                                 <option value="SN">{t('country.Senegal')}</option>
                                 <option value="ZA">{t('country.South Africa')}</option>
                                 <option value="TZ">{t('country.Tanzania')}</option>
                                 <option value="UG">{t('country.Uganda')}</option>
                                 <option value="ZM">{t('country.Zambia')}</option>
                              </Select>
                           </FormControl>
                           
                           <FormControl mb={3} id="institution_type" isRequired={true}>
                              <FormLabel>{t('form:Type of institution')}</FormLabel>
                              <Select {...register("institution_type", { required: true, valueAsNumber: false })} defaultValue="2">
                                 <option value="1">{t('High School')}</option>
                                 <option value="2">{t('College/University')}</option>
                                 <option value="3">{t('Organization')}</option>
                              </Select>
                           </FormControl>
                           
                           <FormControl mb={3} id="reason" isRequired={true}>
                              <FormLabel>{t('form:Why are you contacting us?')}</FormLabel>
                              <Select {...register("reason", { required: true, valueAsNumber: false })} defaultValue="2">
                                 <option value="1">{t('contact:reasons.I want to learn more about your services')}</option>
                                 <option value="2">{t('contact:reasons.I want to start using Slate\'s services')}</option>
                                 <option value="3">{t('contact:reasons.I need assistance')}</option>
                              </Select>
                           </FormControl>
                           
                           <FormControl mb={3} id="purchase_date" isRequired={true}>
                              <FormLabel>{t('form:When do you plan on making a purchase?')}</FormLabel>
                              <Select {...register("purchase_date", { required: true, valueAsNumber: false })} defaultValue="0">
                                 <option value="0">N/A</option>
                                 <option value="1">ASAP</option>
                                 <option value="2">{t('contact:purchase_dates.Within 3 months')}</option>
                                 <option value="3">{t('contact:purchase_dates.Within 12 months')}</option>
                                 <option value="4">{t('contact:purchase_dates.More than 12 months')}</option>
                              </Select>
                           </FormControl>
                           
                           <FormControl mb={3} id="comments">
                              <FormLabel>{t('form:Comments')}</FormLabel>
                              <Textarea {...register("comments")} placeholder={t('form:Comments')} borderColor={'#e0d8d5'} />
                           </FormControl>
                           
                           
                           <Button colorScheme="brand.100" width="100%" type="submit" isLoading={isLoading}>{t('Contact us')}</Button>
                        
                        
                        </form>
                        
                        <Box mt={5}>
                           <Trans ns="contact" i18nKey="alreadyRegistered">
                              Already have a registered institution? <Button variant="link" ml={2}>Sign in here</Button>
                           </Trans>
                        </Box>
                     </Box>
                     
                  }
               
               
               </Box>
            
            </motion.span>
            
            {/*<ColorModeToggleButton />*/}
         
         </SchoolRegistrationLayout>
      
      </>
   
   )
}


export default withApollo()(ContactUs)
