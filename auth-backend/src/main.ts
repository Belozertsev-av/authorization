import { NestFactory } from "@nestjs/core"
import { AppModule } from "/~/app.module"
import "reflect-metadata"
import cookieParser from "cookie-parser"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  await app.listen(process.env.APP_PORT ?? 3000)
}
void bootstrap()
