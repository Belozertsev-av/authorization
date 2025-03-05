import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  Request,
  Res,
  UnauthorizedException,
  UseGuards,
  Logger,
  HttpCode,
  HttpStatus,
} from "@nestjs/common"
import { AuthService } from "/~/auth/auth.service"
import {
  AuthenticatedRequest,
  LoginCredentials,
  Payload,
} from "/~/auth/auth.types"
import { AuthGuard } from "/~/auth/auth.guard"
import { Public } from "/~/auth/auth.decorators"
import { Request as RequestType } from "express"
import { Response as ResponseType } from "express"

@Controller("auth")
export class AuthController {
  private readonly logger = new Logger(AuthController.name)

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post("login")
  async signIn(
    @Body() credentials: LoginCredentials,
    @Res() res: ResponseType,
  ) {
    return await this.authService.signIn(credentials, res)
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() request: AuthenticatedRequest) {
    return request.user
  }

  @UseGuards(AuthGuard)
  @Post("refresh")
  async refresh(@Req() req: RequestType, @Res() res: ResponseType) {
    const refreshToken = req.cookies["refreshToken"] as string | undefined
    if (!refreshToken) {
      this.logger.warn("No refresh token provided")
      throw new UnauthorizedException("No refresh token provided")
    }

    const decoded = this.authService.decodeToken(refreshToken) as Payload
    return this.authService.refreshToken(decoded.login, refreshToken, res)
  }

  @HttpCode(HttpStatus.OK)
  @UseGuards(AuthGuard)
  @Post("logout")
  async logout(@Req() req: RequestType) {
    const refreshToken: string | undefined = req.cookies["refreshToken"] as
      | string
      | undefined
    if (!refreshToken) {
      this.logger.warn("No refresh token provided during logout")
      throw new UnauthorizedException("No refresh token provided")
    }

    const decoded = this.authService.decodeToken(refreshToken) as Payload
    await this.authService.invalidateRefreshToken(decoded.login)
    return { message: "Logged out successfully" }
  }
}
