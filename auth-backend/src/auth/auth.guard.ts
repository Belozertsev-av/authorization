import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  Logger,
} from "@nestjs/common"
import { JwtService } from "@nestjs/jwt"
import { ConfigService } from "@nestjs/config"
import { Reflector } from "@nestjs/core"
import { IS_PUBLIC_KEY } from "/~/auth/auth.decorators"
import { AuthenticatedRequest, Payload } from "/~/auth/auth.types"

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name)

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ])
    if (isPublic) {
      return true
    }

    const request: AuthenticatedRequest = context.switchToHttp().getRequest()
    const token = this.extractTokenFromHeader(request)
    if (!token) {
      this.logger.warn("No token provided in the request")
      throw new UnauthorizedException("No token provided")
    }
    try {
      request.user = await this.jwtService.verifyAsync<Payload>(token, {
        secret: this.configService.get<string>("JWT_SECRET"),
      })
    } catch (error) {
      this.logger.error(`Token verification failed: ${error.message}`)
      throw new UnauthorizedException("Invalid token")
    }
    return true
  }

  private extractTokenFromHeader(
    request: AuthenticatedRequest,
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? []
    return type === "Bearer" ? token : undefined
  }
}
