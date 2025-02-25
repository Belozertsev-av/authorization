import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common"
import { Repositories } from "/~/constants"
import { User } from "/~/users/user.entity"
import * as bcrypt from "bcrypt"

@Injectable()
export class UsersService {
  constructor(
    @Inject(Repositories.users)
    private userRepository: typeof User,
  ) {}

  async getUser(login: string): Promise<User | null> {
    return this.userRepository.findOne({
      where: { login },
    })
  }

  async createUser(userData: Partial<User>): Promise<User> {
    const { login, tabel, password } = userData

    // Проверка на уникальность login и tabel
    const existingUser = await this.userRepository.findOne({
      where: { login },
    })
    if (existingUser) {
      throw new BadRequestException("User with this login already exists")
    }

    const existingTabel = await this.userRepository.findOne({
      where: { tabel },
    })
    if (existingTabel) {
      throw new BadRequestException("User with this tabel already exists")
    }

    // Хеширование пароля
    const hashedPassword = await bcrypt.hash(password!, 10)
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    })

    return newUser
  }

  async updateUser(login: string, userData: Partial<User>): Promise<User> {
    const user = await this.getUser(login)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 10)
    }

    await user.update(userData)
    return user
  }

  async deleteUser(login: string): Promise<void> {
    const user = await this.getUser(login)
    if (!user) {
      throw new NotFoundException("User not found")
    }

    await user.destroy()
  }
}
