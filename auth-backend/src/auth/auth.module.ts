import { Module } from "@nestjs/common"
import { AuthController } from "/~/auth/auth.controller"
import { AuthService } from "/~/auth/auth.service"
import { JwtModule } from "@nestjs/jwt"
import { UsersModule } from "/~/users/users.module"
import { ConfigModule, ConfigService } from "@nestjs/config"
import { APP_GUARD } from "@nestjs/core"
import { AuthGuard } from "/~/auth/auth.guard"
import { RedisModule } from "/~/redis/redis.module"

@Module({
  imports: [
    RedisModule,
    UsersModule,
    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>("JWT_SECRET"),
        signOptions: { expiresIn: "15m" },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
  exports: [AuthService],
})
export class AuthModule {}
