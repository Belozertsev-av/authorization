import { Request } from "express"
import { User } from "/~/users/user.entity"

export type LoginCredentials = {
  login: string
  tabel: number
  password: string
}

export interface AuthenticatedRequest extends Request {
  user: Payload
}

export type Payload = Omit<User, "password">
