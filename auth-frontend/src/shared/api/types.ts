export interface IBaseItem extends ICreatedAt, IUpdatedAt {
  id: number
}

export interface ICreatedAt {
  createdAt: number
}
export interface IUpdatedAt {
  updatedAt: number
}

export interface IToken {
  accessToken: string
}
