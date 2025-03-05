import { axiosInstance, IToken } from "/~/shared/api"
import { IUserInput, IUserResponse } from "/~/entities/users"

export const logIn = async (userInput: IUserInput): Promise<IToken> => {
  try {
    const response = await axiosInstance.post<IToken>("/auth/login", userInput)
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const getUserInfo = async (): Promise<IUserResponse> => {
  try {
    const response = await axiosInstance.get<IUserResponse>("/auth/profile")
    return response.data
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const logOut = async (): Promise<void> => {
  try {
    await axiosInstance.post("/auth/logout")
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
