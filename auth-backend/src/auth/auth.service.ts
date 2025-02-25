import {
  Injectable,
  NotFoundException,
  Response,
  UnauthorizedException,
  Logger,
} from "@nestjs/common"
import { UsersService } from "/~/users/users.service"
import { JwtService } from "@nestjs/jwt"
import { LoginCredentials, Payload } from "/~/auth/auth.types"
import { RedisService } from "/~/redis/redis.service"
import { Response as ResponseType } from "express"
import * as bcrypt from "bcrypt"

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name)

  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    private readonly redisService: RedisService,
  ) {}

  async signIn(
    credentials: LoginCredentials,
    @Response({ passthrough: true }) res: ResponseType,
  ): Promise<{ accessToken: string }> {
    const user = await this.usersService.getUser(credentials.login)
    if (!user) {
      this.logger.warn(`User with login ${credentials.login} not found`)
      throw new UnauthorizedException("Invalid credentials")
    }

    const isPasswordValid = await bcrypt.compare(
      credentials.password,
      user.password,
    )
    if (!isPasswordValid) {
      this.logger.warn(`Invalid password for user ${credentials.login}`)
      throw new UnauthorizedException("Invalid credentials")
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user
    const payload = rest as Payload

    return await this.generateTokens(payload, res)
  }

  async generateTokens(
    payload: Payload,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    const accessToken = this.jwtService.sign(payload)
    const refreshToken = this.jwtService.sign(payload, {
      expiresIn: "7d",
    })

    // Сохраняем refreshToken в Redis
    await this.redisService.set(
      `refreshToken:${payload.login}`,
      refreshToken,
      7 * 24 * 60 * 60,
    ) // 7 дней

    // Устанавливаем refreshToken как httpOnly cookie
    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 дней
    })
    res.send({ accessToken })

    return { accessToken }
  }

  async refreshToken(
    login: string,
    refreshToken: string,
    @Response({ passthrough: true }) res: ResponseType,
  ) {
    const isValid = await this.validateRefreshToken(login, refreshToken)
    if (!isValid) {
      this.logger.warn(`Invalid refresh token for user ${login}`)
      throw new UnauthorizedException("Invalid refresh token")
    }

    const user = await this.usersService.getUser(login)

    if (!user) {
      this.logger.warn(`User with login ${login} not found during refresh`)
      throw new NotFoundException()
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...rest } = user
    const payload = rest as Payload

    return await this.generateTokens(payload, res)
  }

  async validateRefreshToken(
    login: string,
    refreshToken: string,
  ): Promise<boolean> {
    const storedRefreshToken = await this.redisService.get(
      `refreshToken:${login}`,
    )
    return storedRefreshToken === refreshToken
  }

  async invalidateRefreshToken(login: string): Promise<void> {
    await this.redisService.del(`refreshToken:${login}`)
    this.logger.log(`Refresh token invalidated for user ${login}`)
  }

  decodeToken(token: string): any {
    return this.jwtService.decode(token)
  }
}
