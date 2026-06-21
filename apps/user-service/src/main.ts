import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:3000',
    credentials: true,
  });
  const port = process.env.PORT || 6002;
  await app.listen(port);
  console.log(`User Service is running on: http://localhost:${port}`);
}
bootstrap();
