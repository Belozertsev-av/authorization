import {
  Body,
  Controller,
  Get,
  Post,
  Param,
  Delete,
  Patch,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common"
import { Public } from "/~/auth/auth.decorators"
import { UsersService } from "/~/users/users.service"
import { User } from "/~/users/user.entity"

@Controller("users")
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Public()
  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers()
  }

  @Public()
  @Get(":login")
  async getUser(@Param("login") login: string) {
    return await this.usersService.getUserByLogin(login)
  }

  @Public()
  @Post()
  async createUser(@Body() userData: Partial<User>) {
    try {
      return await this.usersService.createUser(userData)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Public()
  @Patch(":login")
  async updateUser(
    @Param("login") login: string,
    @Body() userData: Partial<User>,
  ) {
    try {
      return await this.usersService.updateUser(login, userData)
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }

  @Public()
  @Delete(":login")
  async deleteUser(@Param("login") login: string) {
    try {
      await this.usersService.deleteUser(login)
      return { message: "User deleted successfully" }
    } catch (error) {
      throw new BadRequestException(error.message)
    }
  }
}
