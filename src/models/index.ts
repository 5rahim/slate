import { TypeORMUserModel } from "next-auth/adapters"
import User, { UserSchema } from "./User"

export default {
   User: {
      model: User,
      schema: UserSchema,
   },
} as any
