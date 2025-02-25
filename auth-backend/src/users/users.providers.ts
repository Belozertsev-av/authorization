import { User } from "/~/users/user.entity"
import { Repositories } from "/~/constants"

export const usersProviders = [
  {
    provide: Repositories.users,
    useValue: User,
  },
]
