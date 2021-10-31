import SlateUser from '../graphql/types/User'

export const Names = {
   formatLocaleNames: (
      locale: string | undefined,
      firstName: string | undefined,
      lastName: string | undefined,
      middleName?: string,
      capitalizeLastName: boolean = false
   ) => {
      
      if(!locale)
         return '[No locale provided]'
      
      function getlastName(): string | undefined {
         return capitalizeLastName ? lastName?.toUpperCase() : lastName
      }
      
      switch (locale) {
         case 'fr':
            return [getlastName(), middleName, firstName].join(' ')
         case 'en':
            return [firstName, middleName, getlastName()].join(' ')
      }
      
   },
   
   formatLocaleFullName: (locale: string | undefined, user: SlateUser | undefined, capitalizeLastName: boolean = false) => {
      if(!locale)
         return '[No locale provided]'
      
      if(!user)
         return '???'
      
      const { first_name, last_name, middle_name } = user
      
      function getlastName(): string | undefined {
         return capitalizeLastName ? last_name?.toUpperCase() : last_name
      }
      
      switch (locale) {
         case 'fr':
            return [getlastName(), middle_name, first_name].join(' ')
         case 'en':
            return [first_name, middle_name, getlastName()].join(' ')
      }
      
   },
   
   formatInitials: (user: SlateUser | undefined) => {
      
      if(!user)
         return '???'
      
      const { first_name, last_name, middle_name } = user
      
      return [first_name.charAt(0).toUpperCase(), last_name.charAt(0).toUpperCase()].join('')
      
   }
}

// Zaki BONFOH, Zaki Abde BONFOH, Zaki Abde,
