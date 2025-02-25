import { Request } from "express"
import { User } from "/~/users/user.entity"

export type LoginCredentials = Record<"login" | "password" | "tabel", string>

export interface AuthenticatedRequest extends Request {
  user: Payload
}

export type Payload = Omit<User, "password">
