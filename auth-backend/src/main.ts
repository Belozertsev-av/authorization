import { NestFactory } from "@nestjs/core"
import { AppModule } from "/~/app.module"
import "reflect-metadata"
import cookieParser from "cookie-parser"
import { ValidationPipe } from "@nestjs/common"

async function bootstrap() {
  const app = await NestFactory.create(AppModule)
  app.useGlobalPipes(new ValidationPipe())
  app.use(cookieParser())
  app.setGlobalPrefix("api")
  // CORS для доступа с фронтенда
  app.enableCors({
    origin: [process.env.BASE_URL, "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
  await app.listen(process.env.BACKEND_PORT ?? 3000)
}
void bootstrap()
