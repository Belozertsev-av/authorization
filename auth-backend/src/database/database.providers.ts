import { Sequelize } from "sequelize-typescript"
import { ConfigService } from "@nestjs/config"
import { User } from "/~/users/user.entity"
import { Contants } from "/~/constants"

export const databaseProviders = [
  {
    provide: Contants.sequalize,
    useFactory: async (configService: ConfigService) => {
      const sequelize = new Sequelize({
        dialect: "postgres",
        host: configService.get<string>("DATABASE_HOST"),
        port: configService.get<number>("DATABASE_PORT"),
        username: configService.get<string>("DATABASE_USER"),
        password: configService.get<string>("DATABASE_PASSWORD"),
        database: configService.get<string>("DATABASE_NAME"),
      })
      sequelize.addModels([User])
      await sequelize.sync()
      return sequelize
    },
    inject: [ConfigService],
  },
]
