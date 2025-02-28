import {
  Inject,
  Injectable,
  BadRequestException,
  NotFoundException,
} from "@nestjs/common"
import { Repositories } from "/~/constants"
import { User } from "/~/users/user.entity"
import * as argon2 from "argon2"
import { WhereOptions } from "sequelize"

@Injectable()
export class UsersService {
  constructor(
    @Inject(Repositories.users)
    private userRepository: typeof User,
  ) {}

  async getUser(where: WhereOptions<User>): Promise<User | null> {
    return (
      await this.userRepository.findOne({
        where,
      })
    )?.dataValues as User | null
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
    const hashedPassword = await argon2.hash(password!)
    const newUser = await this.userRepository.create({
      ...userData,
      password: hashedPassword,
    })

    return newUser
  }

  async updateUser(login: string, userData: Partial<User>): Promise<User> {
    const user = await this.getUser({ login })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    if (userData.password) {
      userData.password = await argon2.hash(userData.password)
    }

    await user.update(userData)
    return user
  }

  async deleteUser(login: string): Promise<void> {
    const user = await this.getUser({ login })
    if (!user) {
      throw new NotFoundException("User not found")
    }

    await user.destroy()
  }
}
