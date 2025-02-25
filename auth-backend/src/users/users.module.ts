import { Module } from "@nestjs/common"
import { UsersService } from "/~/users/users.service"
import { UsersController } from "/~/users/users.controller"
import { DatabaseModule } from "/~/database/database.module"
import { usersProviders } from "/~/users/users.providers"

@Module({
  imports: [DatabaseModule],
  providers: [UsersService, ...usersProviders],
  controllers: [UsersController],
  exports: [UsersService, ...usersProviders],
})
export class UsersModule {}
