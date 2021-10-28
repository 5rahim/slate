import * as Adapters from "next-auth/adapters"

// Extend the built-in models using class inheritance
export default // @ts-ignore
class User extends Adapters.TypeORM.Models.User {
   // You can extend the options in a model but you should not remove the base
   // properties or change the order of the built-in options on the constructor
   first_name
   last_name
   constructor(name: string, email: string, image: string, emailVerified: any, first_name: string, last_name: string) {
      super(name, email, image, emailVerified)
      if(first_name) this.first_name = first_name
      if(last_name) this.last_name = last_name
   }
}

export const UserSchema = {
   name: 'User',
   target: User,
   columns: {
      ...Adapters.TypeORM.Models.User.schema.columns,
      // Adds to the User schema
      first_name: {
         type: "varchar",
         nullable: false,
      },
      last_name: {
         type: "varchar",
         nullable: false,
      },
   },
}
