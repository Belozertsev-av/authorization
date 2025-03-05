import { IBaseItem } from "/~/shared/api"

export interface IUserInput {
  tabel: number
  login: string
  password: string
}

export interface IUserForm extends IUserInput {
  rememberAccount: boolean
}

export interface IUserResponse extends IBaseItem, Omit<IUserInput, "password"> {}

export type UserInfo = Omit<IUserInput, "password">
